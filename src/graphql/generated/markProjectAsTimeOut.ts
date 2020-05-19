/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: markProjectAsTimeOut
// ====================================================

export interface markProjectAsTimeOut_update_projects {
  __typename: "projects_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface markProjectAsTimeOut {
  /**
   * update data of the table: "projects"
   */
  update_projects: markProjectAsTimeOut_update_projects | null;
}

export interface markProjectAsTimeOutVariables {
  project_id: number;
}
