import _ from "lodash";
import gqlClient from "~@/core/modules/hasura.module";
import {
  fetchProjectById as IfetchProjectById,
  fetchProjectByIdVariables
} from "~@/graphql/generated/fetchProjectById";
import { FETCH_PROJECTS_BY_ID } from "~@/graphql/query";
import { IFLProject } from "~@/types";

export default async (projects: IFLProject[]) => {
  let unSavedProjects: IFLProject[] = [];
  await Promise.all(
    projects.map(async project => {
      const isExisted = await isExist(project.id);
      if (!isExisted) {
        unSavedProjects.push(project);
      }
      return;
    })
  );
  return unSavedProjects;
};

const fetchProjectById = async (projectId: number) => {
  const {
    data: { projects }
  } = await gqlClient.query<IfetchProjectById, fetchProjectByIdVariables>({
    query: FETCH_PROJECTS_BY_ID,
    variables: {
      projectId
    }
  });
  return projects;
};

const isExist = async (projectId: number) => {
  const projects = await fetchProjectById(projectId);
  return projects.length > 0;
};
