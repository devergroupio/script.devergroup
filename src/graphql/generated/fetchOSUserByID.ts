/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchOSUserByID
// ====================================================

export interface fetchOSUserByID_user {
  __typename: "outsource_user";
  _data: any | null;
  user_id: any;
}

export interface fetchOSUserByID {
  /**
   * fetch data from the table: "outsource_user" using primary key columns
   */
  user: fetchOSUserByID_user | null;
}

export interface fetchOSUserByIDVariables {
  user_id: any;
}
