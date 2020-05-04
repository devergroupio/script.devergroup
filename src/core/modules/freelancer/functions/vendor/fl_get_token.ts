import httpModule from "~@/core/modules/http.module";
import { CONFIG } from "~@/core/utils";
export default async (linkProject: string) => {
    linkProject = linkProject.replace(/\.html/gi, "");
    try {
        const { data } = await httpModule.axios.get(`${CONFIG.FREELANCER_HOST}${linkProject}/?w=f`);
        const csrfToken = data.search("csrfToken = '");
        const similar1 = data.indexOf("'", csrfToken + "csrfToken = '".length);
        const crsfkey = data.slice(csrfToken + "csrfToken = '".length, similar1);
        return crsfkey;
    } catch (err) {
        throw new Error(`invalid url when fetch csrfToken. link: ${linkProject}`);
    }
};
