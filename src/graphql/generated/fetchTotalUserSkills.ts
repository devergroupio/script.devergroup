/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchTotalUserSkills
// ====================================================

export interface fetchTotalUserSkills_users_skills_skill {
  __typename: "jobs";
  title: string;
  id: number;
}

export interface fetchTotalUserSkills_users_skills {
  __typename: "user_skill";
  /**
   * An object relationship
   */
  skill: fetchTotalUserSkills_users_skills_skill;
}

export interface fetchTotalUserSkills_users {
  __typename: "users";
  email: string;
  /**
   * An array relationship
   */
  skills: fetchTotalUserSkills_users_skills[];
}

export interface fetchTotalUserSkills {
  /**
   * fetch data from the table: "users"
   */
  users: fetchTotalUserSkills_users[];
}
