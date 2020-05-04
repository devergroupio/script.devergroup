import { IprojectFilter } from "~@/core/modules/freelancer/functions/fl_filter_job";
import onUnQuanlity from "~@/core/modules/freelancer/hooks/fl_on_unquanlity_project";
import { detectLang } from "~@/core/modules/translate.module";
import { IFLProject } from "~@/types";

export default async (projects: IFLProject[], settings: IprojectFilter) => {
    const passedProjects = [];
    await Promise.all(
        projects.map(async project => {
            const isPassed = await isReadableLanguage(settings.filterSetting, project.appended_descr);
            if (isPassed) {
                passedProjects.push(project);
            } else {
                await onUnQuanlity(project, "skills");
            }
        })
    );
    return passedProjects;
};

// tslint:disable-next-line:variable-name
async function isReadableLanguage(_settings: IprojectFilter["filterSetting"], description: string) {
    const readAbleLangs = ["en", "vi"];
    const lang = await detectLang(description);
    return readAbleLangs.includes(lang);
}
