import onUnQuanlity from "~@/core/modules/freelancer/hooks/fl_on_unquanlity_project";
import { IFLProject } from "~@/types";
import { IprojectFilter } from "../fl_filter_job";

// tslint:disable-next-line:variable-name
export default async (projects: IFLProject[], _settings: IprojectFilter) => {
  const passedProjects = [];
  await Promise.all(
    projects.map(async project => {
      const isPassed = isBidableProject(project);
      if (isPassed) {
        passedProjects.push(project);
      } else {
        await onUnQuanlity(project, "un_quality_project");
      }
    })
  );
  return passedProjects;
};

const isBidableProject = (project: IFLProject) => {
  if (
    project.type === "project" &&
    !project.nonpublic &&
    !project.fulltime &&
    Number(project.free_bid_until) === 0 && // @TODO: check this field
    !project.nda
  ) {
    return true;
  } else {
    return false;
  }
};
