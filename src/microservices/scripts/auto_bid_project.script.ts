const scriptUid = process.env.script_uid;
import moment from "moment";
import { PROJECT_CONFIRM_TYPE } from "~@/constant";
import gqlClient from "~@/core//modules/hasura.module";
import errorHandling from "~@/core/modules/error.module";
errorHandling.listen();
import { bidProject } from "~@/core/modules/freelancer";
import logger from "~@/core/modules/log.module";
import { isCanAutoBid } from "~@/core/utils/hasura";
import {
  fetchOnGoingBidInfo,
  fetchOnGoingBidInfoVariables
} from "~@/graphql/generated/fetchOnGoingBidInfo";
import {
  markProjectAsAccepted,
  markProjectAsAcceptedVariables
} from "~@/graphql/generated/markProjectAsAccepted";
import {
  markProjectAsTimeOut,
  markProjectAsTimeOutVariables
} from "~@/graphql/generated/markProjectAsTimeOut";
import {
  MARK_PROJECT_AS_ACCEPTED,
  MARK_PROJECT_BY_ID_AS_TIME_OUT
} from "~@/graphql/mutation";
import { FETCH_ONGOING_BIDINFO } from "~@/graphql/query";
import { fetchScriptInfo } from "../cron.running";

const fetchRequiredData = async () => {
  const {
    data: { projects, bidSettings }
  } = await gqlClient.query<fetchOnGoingBidInfo, fetchOnGoingBidInfoVariables>({
    query: FETCH_ONGOING_BIDINFO,
    fetchPolicy: "no-cache",
    variables: {
      timeMax: moment(),
      timeMin: moment().subtract(1, "day")
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
            moment(project.created_at).add(TIMER, "seconds")
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
            const bidAble = await isCanAutoBid(project.id);
            if (bidAble) {
              await gqlClient.mutate<
                markProjectAsAccepted,
                markProjectAsAcceptedVariables
              >({
                mutation: MARK_PROJECT_AS_ACCEPTED,
                variables: {
                  confirmStatus: 1,
                  projectId: project.id
                }
              });
              console.log("marking project as accept");
            } else {
              console.log("project is waiting to be confirmed", project.id);
            }
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
