/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: fetchPortfolio
// ====================================================

export interface fetchPortfolio_projects_by_pk_projectsjobs_job_portfolios_portfolio {
  __typename: "portfolio";
  excerpt: string | null;
  link: string;
  description: string;
  id: number;
}

export interface fetchPortfolio_projects_by_pk_projectsjobs_job_portfolios {
  __typename: "portfolio_skill";
  /**
   * An object relationship
   */
  portfolio: fetchPortfolio_projects_by_pk_projectsjobs_job_portfolios_portfolio;
}

export interface fetchPortfolio_projects_by_pk_projectsjobs_job {
  __typename: "jobs";
  title: string;
  /**
   * An array relationship
   */
  portfolios: fetchPortfolio_projects_by_pk_projectsjobs_job_portfolios[];
}

export interface fetchPortfolio_projects_by_pk_projectsjobs {
  __typename: "projectsjobs";
  /**
   * An object relationship
   */
  job: fetchPortfolio_projects_by_pk_projectsjobs_job;
}

export interface fetchPortfolio_projects_by_pk {
  __typename: "projects";
  /**
   * An array relationship
   */
  projectsjobs: fetchPortfolio_projects_by_pk_projectsjobs[];
}

export interface fetchPortfolio {
  /**
   * fetch data from the table: "projects" using primary key columns
   */
  projects_by_pk: fetchPortfolio_projects_by_pk | null;
}

export interface fetchPortfolioVariables {
  pid: number;
}
