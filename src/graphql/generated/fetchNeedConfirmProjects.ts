/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchNeedConfirmProjects
// ====================================================

export interface fetchNeedConfirmProjects_projects {
  __typename: "projects";
  id: number;
}

export interface fetchNeedConfirmProjects {
  /**
   * fetch data from the table: "projects"
   */
  projects: fetchNeedConfirmProjects_projects[];
}

export interface fetchNeedConfirmProjectsVariables {
  timeMin: any;
  timeMax: any;
}
