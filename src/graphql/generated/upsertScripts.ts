/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { scripts_insert_input, scripts_on_conflict } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: upsertScripts
// ====================================================

export interface upsertScripts_insert_scripts {
  __typename: "scripts_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface upsertScripts {
  /**
   * insert data into the table: "scripts"
   */
  insert_scripts: upsertScripts_insert_scripts | null;
}

export interface upsertScriptsVariables {
  scripts: scripts_insert_input[];
  on_conflict: scripts_on_conflict;
}
