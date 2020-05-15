/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUnsupportedCustomer
// ====================================================

export interface getUnsupportedCustomer_unsupported_customer_thread_project_skills_skill_users_user {
  __typename: "users";
  status: string;
}

export interface getUnsupportedCustomer_unsupported_customer_thread_project_skills_skill_users {
  __typename: "user_skill";
  /**
   * An object relationship
   */
  user: getUnsupportedCustomer_unsupported_customer_thread_project_skills_skill_users_user;
}

export interface getUnsupportedCustomer_unsupported_customer_thread_project_skills_skill {
  __typename: "jobs";
  /**
   * An array relationship
   */
  users: getUnsupportedCustomer_unsupported_customer_thread_project_skills_skill_users[];
  id: number;
  title: string;
}

export interface getUnsupportedCustomer_unsupported_customer_thread_project_skills {
  __typename: "projectsjobs";
  /**
   * An object relationship
   */
  skill: getUnsupportedCustomer_unsupported_customer_thread_project_skills_skill;
}

export interface getUnsupportedCustomer_unsupported_customer_thread_project {
  __typename: "projects";
  id: number;
  /**
   * An array relationship
   */
  skills: getUnsupportedCustomer_unsupported_customer_thread_project_skills[];
}

export interface getUnsupportedCustomer_unsupported_customer_thread {
  __typename: "chat_thread";
  id: any;
  /**
   * An object relationship
   */
  project: getUnsupportedCustomer_unsupported_customer_thread_project | null;
}

export interface getUnsupportedCustomer_unsupported_customer {
  __typename: "unsupported_customer";
  last_message: any | null;
  /**
   * An object relationship
   */
  thread: getUnsupportedCustomer_unsupported_customer_thread | null;
}

export interface getUnsupportedCustomer {
  /**
   * fetch data from the table: "unsupported_customer"
   */
  unsupported_customer: getUnsupportedCustomer_unsupported_customer[];
}
