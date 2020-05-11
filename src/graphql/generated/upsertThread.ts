/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { chat_thread_insert_input, chat_thread_on_conflict } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: upsertThread
// ====================================================

export interface upsertThread_insert_chat_thread_one {
  __typename: "chat_thread";
  id: any;
}

export interface upsertThread {
  /**
   * insert a single row into the table: "chat_thread"
   */
  insert_chat_thread_one: upsertThread_insert_chat_thread_one | null;
}

export interface upsertThreadVariables {
  object: chat_thread_insert_input;
  on_conflict?: chat_thread_on_conflict | null;
}
