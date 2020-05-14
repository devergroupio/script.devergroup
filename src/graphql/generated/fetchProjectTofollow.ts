/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { timestamptz_comparison_exp } from "./globalTypes";

// ====================================================
// GraphQL query operation: fetchProjectTofollow
// ====================================================

export interface fetchProjectTofollow_projects {
  __typename: "projects";
  id: number;
  status: string | null;
}

export interface fetchProjectTofollow {
  /**
   * fetch data from the table: "projects"
   */
  projects: fetchProjectTofollow_projects[];
}

export interface fetchProjectTofollowVariables {
  lastSyncFilter: timestamptz_comparison_exp;
}
