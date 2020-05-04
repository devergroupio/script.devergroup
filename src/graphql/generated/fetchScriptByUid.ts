/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchScriptByUid
// ====================================================

export interface fetchScriptByUid_scripts {
  __typename: "scripts";
  created_at: any;
  enable: boolean;
  spinSleepTime: number;
  uid: string;
  updated_at: any;
}

export interface fetchScriptByUid {
  /**
   * fetch data from the table: "scripts"
   */
  scripts: fetchScriptByUid_scripts[];
}

export interface fetchScriptByUidVariables {
  uid: string;
}
