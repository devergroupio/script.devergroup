import {
  DeepPartial,
  IFLProject,
  ILocalProject,
  ILocalProjectAddFields
} from "~@/types";

import _ from "lodash";
import { PROJECT_CONFIRM_TYPE } from "~@/constant";
const defaultSerializeOps: ILocalProjectAddFields = {
  isBid: false,
  bidError: null,
  confirm: PROJECT_CONFIRM_TYPE.UNCOFMRIM,
  our_cost: null,
  our_cover_letter: null
};

export const serializeProject = (
  project: IFLProject,
  opts: DeepPartial<ILocalProjectAddFields> = defaultSerializeOps
): ILocalProject => {
  const jobObj = _.zipObject(project.jobs, project.jobString.split(","));
  const jobs = Object.entries(jobObj).map(entry => ({
    id: Number(entry[0]),
    title: entry[1].trim()
  }));
  return {
    jobs,
    actionText: project.actionText,
    appended_descr: project.appended_descr,
    buyer: project.buyer ? Number(project.buyer) : null,
    currency: project.currency,
    currencyCode: project.currencyCode,
    exchangerate: Number(project.exchangerate),
    extended: project.extended,
    featured: project.featured,
    free_bid_until: Number(project.free_bid_until),
    fulltime: project.fulltime,
    hidebids: project.hidebids,
    id: project.id,
    imgUrl: project.imgUrl,
    ipcontract: project.ipcontract,
    jobString: project.jobString,
    linkUrl: project.linkUrl,
    listed: project.listed,
    maxbudget: Number(project.maxbudget),
    minbudget: Number(project.minbudget),
    nda: project.nda,
    nonpublic: project.nonpublic,
    projIsHourly: project.projIsHourly,
    recruiter: project.recruiter,
    submitDate: project.submitDate,
    text: project.text,
    time: Number(project.time),
    title: project.title,
    type: project.type,
    urgent: project.urgent,
    userId: Number(project.userId),
    userName: project.userName,
    ...{ ...defaultSerializeOps, ...opts }
  };
};

export interface IEnv {
  HASURA_GRAPHQL_JWT_SECRET: string;
  FREELANCER_AI_ENDPOINT: string;
  HASURA_GRAPHQL_ADMIN_SECRET: string;
  HASURA_ENDPOINT: string;
  FREELANCER_USER_AGENT: string;
  FREELANCER_URL_BID: string;
  FREELANCER_API_PROJECT_DETAIL: string;
  FREELANCER_API_USER: string;
  FREELANCER_API_FREELANCER_GETJOB: string;
  CORS: string[];
  FREELANCER_HOST: string;
  PORT: number;
  FREELANCER_APP_COOKIE: string;
  EXCLUDE_SCRIPTS: string[];
  MODE: string;
}

export const CONFIG: IEnv = {
  FREELANCER_API_FREELANCER_GETJOB:
    "https://www.freelancer.com/ajax/notify/live-feed/pre-populated.php",

  FREELANCER_API_PROJECT_DETAIL:
    "https://www.freelancer.com/api/projects/0.1/projects/",
  FREELANCER_API_USER: "https://www.freelancer.com/api/users/0.1/users/",
  FREELANCER_AI_ENDPOINT: process.env.FREELANCER_AI_ENDPOINT,
  FREELANCER_HOST: "https://www.freelancer.com/",
  HASURA_ENDPOINT: process.env.HASURA_ENDPOINT,
  CORS: process.env.CORS.split(","),
  EXCLUDE_SCRIPTS: process.env.EXCLUDE_SCRIPTS.split(","),
  PORT: Number(process.env.PORT),
  HASURA_GRAPHQL_ADMIN_SECRET: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  HASURA_GRAPHQL_JWT_SECRET: JSON.parse(process.env.HASURA_GRAPHQL_JWT_SECRET)
    .key,
  MODE: process.env.MODE,
  FREELANCER_URL_BID: "https://www.freelancer.com/ajax/sellers/onplacebid.php",
  FREELANCER_APP_COOKIE: process.env.FREELANCER_APP_COOKIE,
  FREELANCER_USER_AGENT: process.env.FREELANCER_USER_AGENT
};
