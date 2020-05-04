const scriptUid = process.env.script_uid;
import _ from "lodash";
import errorHandling from "~@/core/modules/error.module";
import {
  fetchProjects,
  filterProjects,
  saveProjects
} from "~@/core/modules/freelancer";
import logger from "~@/core/modules/log.module";
import { serializeProject } from "~@/core/utils";
import { IFLProject } from "~@/types";
import { fetchScriptInfo } from "../cron.running";
errorHandling.listen();

const serializeProjects = (projects: IFLProject[]) => {
  return projects.map(project => serializeProject(project));
};

export const SCRIPT_CONTENT = async () => {
  logger.info("script: %s is starting", "fetch_project");
  const rawProjects = await fetchProjects();
  const projects = serializeProjects(await filterProjects(rawProjects));
  await saveProjects(projects);
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
