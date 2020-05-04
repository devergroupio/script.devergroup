/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { projects_set_input, projects_bool_exp, project_award_insert_input, project_award_on_conflict } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateProjectState
// ====================================================

export interface updateProjectState_update_projects {
  __typename: "projects_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface updateProjectState_insert_project_award {
  __typename: "project_award_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface updateProjectState {
  /**
   * update data of the table: "projects"
   */
  update_projects: updateProjectState_update_projects | null;
  /**
   * insert data into the table: "project_award"
   */
  insert_project_award: updateProjectState_insert_project_award | null;
}

export interface updateProjectStateVariables {
  projectSet: projects_set_input;
  projectWhere: projects_bool_exp;
  projectArwards: project_award_insert_input[];
  on_conflict?: project_award_on_conflict | null;
}
