/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { bot_training_nottasks_insert_input } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: bulkupsertNotTasks
// ====================================================

export interface bulkupsertNotTasks_insert_bot_training_nottasks {
  __typename: "bot_training_nottasks_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface bulkupsertNotTasks {
  /**
   * insert data into the table: "bot_training_nottasks"
   */
  insert_bot_training_nottasks: bulkupsertNotTasks_insert_bot_training_nottasks | null;
}

export interface bulkupsertNotTasksVariables {
  phases: bot_training_nottasks_insert_input[];
}
