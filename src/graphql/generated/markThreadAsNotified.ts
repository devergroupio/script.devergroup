/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: markThreadAsNotified
// ====================================================

export interface markThreadAsNotified_update_chat_log {
  __typename: "chat_log_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface markThreadAsNotified {
  /**
   * update data of the table: "chat_log"
   */
  update_chat_log: markThreadAsNotified_update_chat_log | null;
}

export interface markThreadAsNotifiedVariables {
  thread_id: any;
}
