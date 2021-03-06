/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FETCH_LAST_PROJECTS
// ====================================================

export interface FETCH_LAST_PROJECTS_projects {
  __typename: "projects";
  id: number;
  appended_descr: string | null;
  bidError: string | null;
  jobString: string;
  confirm: number | null;
  currency: string | null;
  title: string;
  currencyCode: string;
  maxbudget: number | null;
  minbudget: number | null;
  projIsHourly: boolean | null;
  submitDate: any;
  isBid: boolean | null;
  our_cost: number | null;
  linkUrl: string;
  our_cover_letter: string | null;
  created_at: any | null;
}

export interface FETCH_LAST_PROJECTS {
  /**
   * fetch data from the table: "projects"
   */
  projects: FETCH_LAST_PROJECTS_projects[];
}
