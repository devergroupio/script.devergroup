/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProjectBD
// ====================================================

export interface updateProjectBD_update_projects {
  __typename: "projects_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface updateProjectBD {
  /**
   * update data of the table: "projects"
   */
  update_projects: updateProjectBD_update_projects | null;
}

export interface updateProjectBDVariables {
  id?: number | null;
  our_cost: number;
  our_cover_letter: string;
}
