/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getOnlineUserForOGP
// ====================================================

export interface getOnlineUserForOGP_projects_by_pk_projectsjobs_job_users_user {
  __typename: "users";
  email: string;
  id: number;
  first_name: string;
  last_name: string;
  status: string;
  auto_bid: boolean | null;
}

export interface getOnlineUserForOGP_projects_by_pk_projectsjobs_job_users {
  __typename: "user_skill";
  /**
   * An object relationship
   */
  user: getOnlineUserForOGP_projects_by_pk_projectsjobs_job_users_user;
}

export interface getOnlineUserForOGP_projects_by_pk_projectsjobs_job {
  __typename: "jobs";
  /**
   * An array relationship
   */
  users: getOnlineUserForOGP_projects_by_pk_projectsjobs_job_users[];
}

export interface getOnlineUserForOGP_projects_by_pk_projectsjobs {
  __typename: "projectsjobs";
  /**
   * An object relationship
   */
  job: getOnlineUserForOGP_projects_by_pk_projectsjobs_job;
}

export interface getOnlineUserForOGP_projects_by_pk {
  __typename: "projects";
  /**
   * An array relationship
   */
  projectsjobs: getOnlineUserForOGP_projects_by_pk_projectsjobs[];
}

export interface getOnlineUserForOGP {
  /**
   * fetch data from the table: "projects" using primary key columns
   */
  projects_by_pk: getOnlineUserForOGP_projects_by_pk | null;
}

export interface getOnlineUserForOGPVariables {
  projectID: number;
}
