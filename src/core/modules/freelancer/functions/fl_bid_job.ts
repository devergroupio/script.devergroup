import querystring from "querystring";
import { FLResponseStatus, PROJECT_CONFIRM_TYPE } from "~@/constant";
import { saveProjects } from "~@/core/modules/freelancer";
import { aiCost, aiSkills, aiTasks } from "~@/core/modules/freelancer/ai";
import gqlClient from "~@/core/modules/hasura.module";
import httpModule from "~@/core/modules/http.module";
import logger from "~@/core/modules/log.module";
import { fetchBidSettings as IfetchBidSettings } from "~@/graphql/generated/fetchBidSettings";
import { fetchTraining as IfetchTraining } from "~@/graphql/generated/fetchTraining";
import { FETCH_BID_SETTINGS, FETCH_TRAINING } from "~@/graphql/query";
import { ILocalProject, Unpromisify } from "~@/types";
import getToken from "./vendor/fl_get_token";
export type IBidSettings = Unpromisify<ReturnType<typeof fetchBidSettings>>;
import { CONFIG } from "~@/core/utils";
interface IBidData {
  id: number;
  sum: number;
  period: number;
  milestone_percentage: number;
  csrf_token: string;
  descr: string;
}
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

export type ITraining = Unpromisify<ReturnType<typeof fetchTraining>>;

const fetchTraining = async () => {
  const { data } = await gqlClient.query<IfetchTraining>({
    query: FETCH_TRAINING
  });
  return data;
};
export const getSuggestion = async (project: ILocalProject) => {
  const [settings, training] = await Promise.all([
    fetchBidSettings(),
    fetchTraining()
  ]);
  const cost = aiCost(settings, project);
  const description = await getDescription(
    project,
    training.detectPhases,
    settings.template
  );
  return {
    cost,
    description
  };
};
export default async (project: ILocalProject) => {
  const [settings, training] = await Promise.all([
    fetchBidSettings(),
    fetchTraining()
  ]);

  const cost = aiCost(settings, project);

  const description = await getDescription(
    project,
    training.detectPhases,
    settings.template
  );
  const BID_DATA: IBidData = {
    id: project.id,
    sum: cost,
    period: 3,
    milestone_percentage: 100,
    csrf_token: await getToken(project.linkUrl),
    descr: description
  };
  return requestToBid(project, BID_DATA);
};

const requestToBid = async (project: ILocalProject, bidData: IBidData) => {
  logger.info(
    "going to bid project %s with data %s",
    project.id,
    JSON.stringify(bidData)
  );

  const { data } = await httpModule.axios.post<{
    status: FLResponseStatus;
    bid: any;
  }>(CONFIG.FREELANCER_URL_BID, querystring.stringify(bidData), {
    headers: {
      "x-xsrf-token": bidData.csrf_token
    }
  });
  const { status } = data;
  if (status === FLResponseStatus.SUCCESS) {
    project.isBid = true;
    project.our_cost = bidData.sum;
    project.our_cover_letter = bidData.descr;
    logger.info(`bid project: ${project.id} was completed`);
    // notifyModule({
    //     message: "Bid Project",
    //     // vietnamese: await translate(project.appended_descr.replace(/\\r|\\n/gi, "")), // @TODO: need to check it
    //     data: JSON.stringify(project)
    // });
  } else {
    project.isBid = false;
    project.bidError = "error_when_request_to_bid";
    project.confirm = PROJECT_CONFIRM_TYPE.SKIPPED;
    logger.info(`bid project: ${project.id} was unsuccessful: `);
    // notifyModule({
    //     message: "CANT_BID_PROJECT",
    //     data: "test"
    // });
  }
  await saveProjects([project]);
};

const getDescription = async (
  project: ILocalProject,
  detectPhases: ITraining["detectPhases"],
  defaultTemplate: string
) => {
  const tasks = await aiTasks(project.appended_descr, detectPhases);
  const skills = aiSkills(project.jobString);
  let template = defaultTemplate;
  if (project.our_cover_letter) {
    template = project.our_cover_letter;
  }
  const taskCollectionString = tasksToText(tasks);

  // tslint:disable-next-line:prefer-conditional-expression
  if (taskCollectionString.length > 0) {
    template = template.replace("#AI_TASKS", taskCollectionString);
  } else {
    template = template.replace("#AI_TASKS", "");
  }
  template = template.replace("#AI_SKILLS", skills);
  return template.replace(/\n\s*\n/g, "\n");
};
function tasksToText(tasks) {
  let text = "";
  if (tasks.length > 0) {
    text = "I checked requirement and i think this is you need: \n";
  }
  tasks.map(task => {
    text += "    + " + task + "\n";
  });
  return text;
}
