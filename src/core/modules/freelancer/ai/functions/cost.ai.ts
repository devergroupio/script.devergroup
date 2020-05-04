import { IBidSettings } from "~@/core/modules/freelancer/functions/fl_bid_job";
import { ILocalProject } from "~@/types";

export default (settings: IBidSettings, project: ILocalProject) => {
  if (project.our_cost) {
    return project.our_cost;
  }
  let minReal = project.minbudget * project.exchangerate;
  let maxReal = project.maxbudget * project.exchangerate;
  let cost = (minReal + maxReal) / 2 + (maxReal / 100) * settings.bid_rate;
  if (cost < settings.min_cost) {
    cost = settings.min_cost;
  }
  cost = cost / project.exchangerate;
  return Math.round(cost);
};
