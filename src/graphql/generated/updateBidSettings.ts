/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { bot_settings_bidsettings_set_input, bot_settings_bidsettings_bool_exp } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateBidSettings
// ====================================================

export interface updateBidSettings_update_bot_settings_bidsettings {
  __typename: "bot_settings_bidsettings_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface updateBidSettings {
  /**
   * update data of the table: "bot_settings_bidsettings"
   */
  update_bot_settings_bidsettings: updateBidSettings_update_bot_settings_bidsettings | null;
}

export interface updateBidSettingsVariables {
  set: bot_settings_bidsettings_set_input;
  where: bot_settings_bidsettings_bool_exp;
}
