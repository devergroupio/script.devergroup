/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchBidSettings
// ====================================================

export interface fetchBidSettings_bot_settings_bidsettings {
  __typename: "bot_settings_bidsettings";
  bid_rate: number;
  min_cost: number;
  timer: number;
  id: number;
  template: string | null;
}

export interface fetchBidSettings_scripts {
  __typename: "scripts";
  enable: boolean;
  uid: string;
  spinSleepTime: number;
}

export interface fetchBidSettings {
  /**
   * fetch data from the table: "bot_settings_bidsettings"
   */
  bot_settings_bidsettings: fetchBidSettings_bot_settings_bidsettings[];
  /**
   * fetch data from the table: "scripts"
   */
  scripts: fetchBidSettings_scripts[];
}
