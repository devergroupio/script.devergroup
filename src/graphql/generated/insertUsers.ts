/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { users_insert_input, users_on_conflict } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: insertUsers
// ====================================================

export interface insertUsers_insert_users_one {
  __typename: "users";
  email: string;
}

export interface insertUsers {
  /**
   * insert a single row into the table: "users"
   */
  insert_users_one: insertUsers_insert_users_one | null;
}

export interface insertUsersVariables {
  object: users_insert_input;
  on_confict?: users_on_conflict | null;
}
