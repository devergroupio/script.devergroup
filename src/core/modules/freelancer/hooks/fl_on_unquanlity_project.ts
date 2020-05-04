import { IFLProject } from "~@/types";

import { PROJECT_CONFIRM_TYPE } from "~@/constant";
import { saveProjects } from "~@/core/modules/freelancer";
import { serializeProject } from "~@/core/utils";

export default (project: IFLProject, error: string) => {
  const serializedProject = serializeProject(project, {
    bidError: error,
    isBid: false,
    confirm: PROJECT_CONFIRM_TYPE.REJECT,
    our_cost: null
  });
  return saveProjects([serializedProject]);
};
