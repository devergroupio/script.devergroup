/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchProjectById
// ====================================================

export interface fetchProjectById_projects_jobs_job {
  __typename: "jobs";
  id: number;
  title: string;
}

export interface fetchProjectById_projects_jobs {
  __typename: "projectsjobs";
  /**
   * An object relationship
   */
  job: fetchProjectById_projects_jobs_job;
}

export interface fetchProjectById_projects {
  __typename: "projects";
  /**
   * An array relationship
   */
  jobs: fetchProjectById_projects_jobs[];
  actionText: string;
  appended_descr: string;
  bidError: string | null;
  buyer: number | null;
  confirm: number | null;
  currency: string;
  currencyCode: string;
  exchangerate: number;
  extended: string | null;
  featured: boolean | null;
  free_bid_until: number;
  fulltime: boolean | null;
  hidebids: boolean | null;
  id: number;
  imgUrl: string;
  ipcontract: string | null;
  isBid: boolean | null;
  jobString: string;
  linkUrl: string;
  listed: boolean | null;
  maxbudget: number | null;
  minbudget: number | null;
  nda: boolean | null;
  nonpublic: boolean | null;
  our_cost: number | null;
  projIsHourly: boolean | null;
  recruiter: boolean | null;
  submitDate: any;
  text: string;
  time: number;
  title: string;
  type: string;
  urgent: boolean | null;
  userId: number;
  our_cover_letter: string | null;
  userName: string;
  created_at: any | null;
  updated_at: any | null;
}

export interface fetchProjectById {
  /**
   * fetch data from the table: "projects"
   */
  projects: fetchProjectById_projects[];
}

export interface fetchProjectByIdVariables {
  projectId: number;
}
