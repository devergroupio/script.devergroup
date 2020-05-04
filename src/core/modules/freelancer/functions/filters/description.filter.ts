import { IprojectFilter } from "~@/core/modules/freelancer/functions/fl_filter_job";
import onUnQuanlity from "~@/core/modules/freelancer/hooks/fl_on_unquanlity_project";
import { IFLProject } from "~@/types";

export default async (projects: IFLProject[], settings: IprojectFilter) => {
  const passedProjects = [];
  await Promise.all(
    projects.map(async project => {
      const isPassed = await isReachMinLength(
        settings.filterSetting,
        project.appended_descr
      );
      if (isPassed) {
        passedProjects.push(project);
      } else {
        await onUnQuanlity(project, "description_length");
      }
    })
  );
  return passedProjects;
};

const isReachMinLength = async (
  settings: IprojectFilter["filterSetting"],
  description: string
) => {
  return description.length >= settings.description_length;
};
