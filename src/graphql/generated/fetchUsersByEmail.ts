/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchUsersByEmail
// ====================================================

export interface fetchUsersByEmail_users {
  __typename: "users";
  email: string;
  first_name: string;
  password: string;
  last_name: string;
  role: string | null;
}

export interface fetchUsersByEmail {
  /**
   * fetch data from the table: "users"
   */
  users: fetchUsersByEmail_users[];
}

export interface fetchUsersByEmailVariables {
  emails: string[];
}
