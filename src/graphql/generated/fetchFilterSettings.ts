/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchFilterSettings
// ====================================================

export interface fetchFilterSettings_filterSettings {
  __typename: "bot_settings_filterwork";
  id: number;
  max_budget: number;
  min_budget: number;
  exchange_rate: number;
  description_length: number;
}

export interface fetchFilterSettings_ignoredSkills {
  __typename: "jobs";
  id: number;
  title: string;
}

export interface fetchFilterSettings {
  /**
   * fetch data from the table: "bot_settings_filterwork"
   */
  filterSettings: fetchFilterSettings_filterSettings[];
  /**
   * fetch data from the table: "jobs"
   */
  ignoredSkills: fetchFilterSettings_ignoredSkills[];
}
