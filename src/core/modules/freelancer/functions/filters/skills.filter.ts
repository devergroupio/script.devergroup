import _ from "lodash";
import { IprojectFilter } from "~@/core/modules/freelancer/functions/fl_filter_job";
import onUnQuanlity from "~@/core/modules/freelancer/hooks/fl_on_unquanlity_project";
import { IFLProject } from "~@/types";

export default async (projects: IFLProject[], settings: IprojectFilter) => {
  const passedProjects = [];
  await Promise.all(
    projects.map(async project => {
      const isPassed = await isPassIgnoredSkills(
        settings.ignoredSkills,
        project.jobs
      );
      if (isPassed) {
        passedProjects.push(project);
      } else {
        await onUnQuanlity(project, "skills");
      }
    })
  );
  return passedProjects;
};

const isPassIgnoredSkills = async (
  ignoredSkills: IprojectFilter["ignoredSkills"],
  projectSkills: string[]
) => {
  const formattedSkills = projectSkills.map(skill => Number(skill));
  const matchedIgnoredSkills = _.intersection(ignoredSkills, formattedSkills);
  return matchedIgnoredSkills.length === 0;
};
