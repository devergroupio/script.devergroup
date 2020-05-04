/**
 * Get The Newest list job from Freelancer
 * @return {Object} return object
 */
import { FLResponseStatus } from "~@/constant";
import http from "~@/core/modules/http.module";
import logger from "~@/core/modules/log.module";
import { CONFIG } from "~@/core/utils";
import { IFLProject, IFLResponse } from "~@/types";
export default async (): Promise<IFLProject[]> => {
    logger.info("crawling projects");
    const { data } = await http.axios.get<IFLResponse<IFLProject[]>>(CONFIG.FREELANCER_API_FREELANCER_GETJOB);
    if (data.result === FLResponseStatus.SUCCESS) {
        return data.data;
    } else {
        // @TODO:  need to handle error
    }
    return [];
};
