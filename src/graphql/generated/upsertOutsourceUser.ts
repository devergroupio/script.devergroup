/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { outsource_user_insert_input, outsource_user_on_conflict } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: upsertOutsourceUser
// ====================================================

export interface upsertOutsourceUser_insert_outsource_user_one {
  __typename: "outsource_user";
  _data: any | null;
  user_id: any;
}

export interface upsertOutsourceUser {
  /**
   * insert a single row into the table: "outsource_user"
   */
  insert_outsource_user_one: upsertOutsourceUser_insert_outsource_user_one | null;
}

export interface upsertOutsourceUserVariables {
  obj: outsource_user_insert_input;
  conflict?: outsource_user_on_conflict | null;
}
