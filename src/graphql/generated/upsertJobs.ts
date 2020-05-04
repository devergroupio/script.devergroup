/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { jobs_insert_input, jobs_on_conflict } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: upsertJobs
// ====================================================

export interface upsertJobs_insert_jobs {
  __typename: "jobs_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface upsertJobs {
  /**
   * insert data into the table: "jobs"
   */
  insert_jobs: upsertJobs_insert_jobs | null;
}

export interface upsertJobsVariables {
  jobs: jobs_insert_input[];
  on_conflict?: jobs_on_conflict | null;
}
