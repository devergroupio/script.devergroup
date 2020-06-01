/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: markProjectAsAccepted
// ====================================================

export interface markProjectAsAccepted_update_projects_by_pk {
  __typename: "projects";
  id: number;
}

export interface markProjectAsAccepted {
  /**
   * update single row of the table: "projects"
   */
  update_projects_by_pk: markProjectAsAccepted_update_projects_by_pk | null;
}

export interface markProjectAsAcceptedVariables {
  projectId: number;
  confirmStatus: number;
}
