const scriptUid = process.env.script_uid;
import moment from "moment";
import { PROJECT_CONFIRM_TYPE } from "~@/constant";
import gqlClient from "~@/core//modules/hasura.module";
import errorHandling from "~@/core/modules/error.module";
errorHandling.listen();
import { bidProject } from "~@/core/modules/freelancer";
import logger from "~@/core/modules/log.module";
import { fetchBidSettings as IfetchBidSettings } from "~@/graphql/generated/fetchBidSettings";
import {
  fetchOnGoingBidInfo,
  fetchOnGoingBidInfoVariables
} from "~@/graphql/generated/fetchOnGoingBidInfo";
import {
  markProjectAsTimeOut,
  markProjectAsTimeOutVariables
} from "~@/graphql/generated/markProjectAsTimeOut";
import { MARK_PROJECT_BY_ID_AS_TIME_OUT } from "~@/graphql/mutation";
import { FETCH_BID_SETTINGS, FETCH_ONGOING_BIDINFO } from "~@/graphql/query";
import { fetchScriptInfo } from "../cron.running";
const fetchBidSettings = async () => {
  const {
    data: { bot_settings_bidsettings }
  } = await gqlClient.query<IfetchBidSettings>({
    query: FETCH_BID_SETTINGS
  });
  if (bot_settings_bidsettings.length > 0) {
    return bot_settings_bidsettings[0];
  }
  throw new Error("Bid setting haven't be setted");
};
const fetchRequiredData = async () => {
  const bidSetting = await fetchBidSettings();

  const {
    data: { projects, bidSettings }
  } = await gqlClient.query<fetchOnGoingBidInfo, fetchOnGoingBidInfoVariables>({
    query: FETCH_ONGOING_BIDINFO,
    variables: {
      timeMax: moment(),
      timeMin: moment().subtract(bidSetting.timer, "seconds")
    }
  });
  if (bidSettings.length <= 0) {
    throw new Error(`bid setting haven't be setted`);
  }
  return {
    projects: projects.map(project => {
      return {
        ...project,
        jobs: project.jobs
          .map(job => ({
            id: Number(job.job.id),
            title: job.job.title
          }))
          .reduce<Array<{ id: number; title: string }>>(
            (prev, current) => [...prev, current],
            []
          )
      };
    }),
    bidSetting: bidSettings[0]
  };
};
export const SCRIPT_CONTENT = async () => {
  const { projects, bidSetting } = await fetchRequiredData();
  logger.info("total projects can bid %s", projects.length);
  const TIMER = bidSetting.timer;
  await Promise.all(
    projects.map(async project => {
      switch (project.confirm) {
        case PROJECT_CONFIRM_TYPE.UNCOFMRIM: {
          const isTimeOut = moment().isAfter(
            moment(project.created_at).add(TIMER, "m")
          );
          if (isTimeOut) {
            // return bidProject(project);
            return gqlClient.mutate<
              markProjectAsTimeOut,
              markProjectAsTimeOutVariables
            >({
              mutation: MARK_PROJECT_BY_ID_AS_TIME_OUT,
              variables: {
                project_id: project.id
              }
            });
          } else {
            console.log("project is waiting to be confirmed", project.id);
          }
          break;
        }
        case PROJECT_CONFIRM_TYPE.ACCEPT: {
          logger.info("biding accepted project, id: %s", project.id);
          return bidProject(project);
        }
      }
    })
  );
};

(async () => {
  // TODO add watch dog
  const scriptInfo = await fetchScriptInfo(scriptUid);
  if (!scriptInfo.enable) {
    logger.warn("script: %s is locking now", scriptUid);
    setTimeout(() => {
      process.exit(0);
    }, scriptInfo.spinSleepTime * 1000);
  } else {
    logger.info(
      "will run script: %s  next %s seconds",
      scriptUid,
      scriptInfo.spinSleepTime
    );
    setTimeout(async () => {
      await SCRIPT_CONTENT();
    }, scriptInfo.spinSleepTime * 1000);
  }
})();
