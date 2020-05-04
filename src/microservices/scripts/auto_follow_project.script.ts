const scriptUid = process.env.script_uid;
import _ from "lodash";
import moment from "moment";
import errorHandling from "~@/core/modules/error.module";

import hsrClient from "~@/core/modules/hasura.module";
import http from "~@/core/modules/http.module";
import logger from "~@/core/modules/log.module";
import {
  fetchProjectTofollow,
  fetchProjectTofollowVariables
} from "~@/graphql/generated/fetchProjectTofollow";
import { project_award_constraint } from "~@/graphql/generated/globalTypes";
import {
  updateProjectState,
  updateProjectStateVariables
} from "~@/graphql/generated/updateProjectState";
import { UPDATE_PROJECT_STATE } from "~@/graphql/mutation";
import { FETCH_PROJECT_TO_FOLLOW } from "~@/graphql/query";
import { fetchScriptInfo } from "../cron.running";
errorHandling.listen();

const fetchProjectsData = async (projectIds: number[]) => {
  logger.info("script: %s is starting", "auto_follow_project");

  const { data } = await http.axios.get(
    "https://www.freelancer.com/api/projects/0.1/projects",
    {
      params: {
        projects: projectIds,
        attachment_details: true,
        full_description: true,
        job_details: true,
        location_details: true,
        nda_details: true,
        project_collaboration_details: true,
        selected_bids: true,
        qualification_details: true,
        upgrade_details: true,
        review_availability_details: true,
        local_details: true,
        equipment_details: true,
        invited_freelancer_details: true,
        webapp: 1,
        compact: true,
        new_errors: true
      }
    }
  );
  return data.result;
};
export const SCRIPT_CONTENT = async () => {
  const {
    data: { projects }
  } = await hsrClient.query<
    fetchProjectTofollow,
    fetchProjectTofollowVariables
  >({
    query: FETCH_PROJECT_TO_FOLLOW,
    variables: {
      lastSyncFilter: {
        _lte: moment()
          .utc()
          .subtract(1, "hour"),
        _gte: moment()
          .utc()
          .subtract(7, "day")
      }
    }
  });
  if (projects.length <= 0) { return; }
  const projectIDs = projects.reduce<number[]>((pre, current) => {
    return [...pre, current.id];
  }, []);
  const { selected_bids, projects: rProjects } = await fetchProjectsData(
    projectIDs
  );
  const processedData = projectIDs.reduce(
    (prev, current) => {
      const isDeleted =
        _.find(rProjects, {
          id: current
        }) === undefined;
      if (isDeleted) {
        prev.deleted.push(current);
        return prev;
      }
      const isAward = selected_bids && selected_bids[current];

      if (isAward) {
        prev.awared.push({
          pid: current,
          _data: isAward
        });
        return prev;
      }
      prev.keepUpdate.push(current);

      return prev;
    },
    {
      deleted: [],
      awared: [],
      keepUpdate: []
    }
  );

  await Promise.all([
    hsrClient.mutate<updateProjectState, updateProjectStateVariables>({
      mutation: UPDATE_PROJECT_STATE,
      variables: {
        projectSet: {
          status: "AWARED",
          lastSync: moment.utc()
        },
        projectWhere: {
          id: {
            _in: processedData.awared.map(awared => awared.pid)
          }
        },
        projectArwards: processedData.awared,
        on_conflict: {
          constraint: project_award_constraint.project_award_pkey,
          update_columns: []
        }
      }
    }),
    hsrClient.mutate<updateProjectState, updateProjectStateVariables>({
      mutation: UPDATE_PROJECT_STATE,
      variables: {
        projectSet: {
          status: "DELETED",
          lastSync: moment.utc()
        },
        projectWhere: {
          id: {
            _in: processedData.deleted
          }
        },
        projectArwards: []
      }
    }),
    hsrClient.mutate<updateProjectState, updateProjectStateVariables>({
      mutation: UPDATE_PROJECT_STATE,
      variables: {
        projectSet: {
          lastSync: moment.utc()
        },
        projectWhere: {
          id: {
            _in: processedData.keepUpdate
          }
        },
        projectArwards: []
      }
    })
  ]);

  logger.info("synced projects: %s", projects.length);
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
