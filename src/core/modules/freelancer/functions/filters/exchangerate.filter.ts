import { IprojectFilter } from "~@/core/modules/freelancer/functions/fl_filter_job";
import onUnQuanlity from "~@/core/modules/freelancer/hooks/fl_on_unquanlity_project";
import { IFLProject } from "~@/types";

export default async (projects: IFLProject[], settings: IprojectFilter) => {
    const passedProjects = [];
    await Promise.all(
        projects.map(async project => {
            const isPassed = await isHighRate(settings.filterSetting, project.exchangerate);
            if (isPassed) {
                passedProjects.push(project);
            } else {
                await onUnQuanlity(project, "exchange_rate");
            }
        })
    );
    return passedProjects;
};

// tslint:disable-next-line:variable-name
async function isHighRate(_settings: IprojectFilter["filterSetting"], exchangerate: string) {
    return Number(exchangerate) >= _settings.exchange_rate;
}
