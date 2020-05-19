import _ from "lodash";
import { IprojectFilter } from "~@/core/modules/freelancer/functions/fl_filter_job";
import onUnQuanlity from "~@/core/modules/freelancer/hooks/fl_on_unquanlity_project";
import { IFLProject } from "~@/types";

export default async (projects: IFLProject[], settings: IprojectFilter) => {
  const passedProjects = [];
  await Promise.all(
    projects.map(async project => {
      const isPassed = isPassIgnoredSkills(
        settings.ignoredSkills,
        project.jobs
      );
      const isHaveSomeone = isHaveSomeoneCanHandleIt(
        settings.onlineSkills,
        project.jobs
      );
      if (isPassed && isHaveSomeone) {
        passedProjects.push(project);
      } else {
        let problem = "skills";
        if (isPassed && !isHaveSomeone) {
          problem = "DEVELOPER_OFFLINE";
        }
        await onUnQuanlity(project, problem);
      }
    })
  );
  return passedProjects;
};

const isHaveSomeoneCanHandleIt = (
  onlineSkills: number[],
  projectSkills: string[]
) => {
  const formattedSkills = projectSkills.map(skill => Number(skill));
  const matchedIgnoredSkills = _.intersection(onlineSkills, formattedSkills);
  return matchedIgnoredSkills.length > 0;
};

const isPassIgnoredSkills = (
  ignoredSkills: IprojectFilter["ignoredSkills"],
  projectSkills: string[]
) => {
  const formattedSkills = projectSkills.map(skill => Number(skill));
  const matchedIgnoredSkills = _.intersection(ignoredSkills, formattedSkills);
  return matchedIgnoredSkills.length === 0;
};
