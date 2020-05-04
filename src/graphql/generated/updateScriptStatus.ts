/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateScriptStatus
// ====================================================

export interface updateScriptStatus_update_scripts {
  __typename: "scripts_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface updateScriptStatus {
  /**
   * update data of the table: "scripts"
   */
  update_scripts: updateScriptStatus_update_scripts | null;
}

export interface updateScriptStatusVariables {
  uid: string;
  status: boolean;
}
