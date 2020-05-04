import { IprojectFilter } from "~@/core/modules/freelancer/functions/fl_filter_job";
import onUnQuanlity from "~@/core/modules/freelancer/hooks/fl_on_unquanlity_project";
import { IFLProject } from "~@/types";

export default async (projects: IFLProject[], settings: IprojectFilter) => {
    const passedProjects = [];
    await Promise.all(
        projects.map(async project => {
            const isPassed = await isGoodBudget(
                settings.filterSetting,
                Number(project.maxbudget),
                Number(project.exchangerate)
            );
            if (isPassed) {
                passedProjects.push(project);
            } else {
                await onUnQuanlity(project, "budget");
            }
        })
    );
    return passedProjects;
};

const isGoodBudget = async (setting: IprojectFilter["filterSetting"], maxbudget: number, exchangerate: number) => {
    const maxReal = Number(maxbudget * exchangerate);
    if (maxReal >= setting.min_budget && maxReal <= setting.max_budget) {
        return true;
    } else {
        return false;
    }
};
