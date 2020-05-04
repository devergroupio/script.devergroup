/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchTraining
// ====================================================

export interface fetchTraining_detectPhases {
  __typename: "bot_training_detectphases";
  id: number;
  phase: string;
}

export interface fetchTraining {
  /**
   * fetch data from the table: "bot_training_detectphases"
   */
  detectPhases: fetchTraining_detectPhases[];
}
