/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProjectStatus
// ====================================================

export interface updateProjectStatus_update_projects {
  __typename: "projects_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface updateProjectStatus {
  /**
   * update data of the table: "projects"
   */
  update_projects: updateProjectStatus_update_projects | null;
}

export interface updateProjectStatusVariables {
  id: number;
  status?: number | null;
}
