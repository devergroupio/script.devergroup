// const firebaseModule = require('../../firebase.module');
// const {
//   isSkills,
//   isEnglish,
//   wordsLength,
//   isIndia,
//   isGoodBudget,
//   isBidable,
// } = require('./filters');
import gqlClient from "~@/core/modules/hasura.module";
import {
  fetchFilterSettings,
  fetchFilterSettings_filterSettings
} from "~@/graphql/generated/fetchFilterSettings";
import { FETCH_FILTER_SETTINGS } from "~@/graphql/query";
import { IFLProject, Unpromisify } from "~@/types";
import {
  isAcceptAbleProject,
  isAcceptableSkills,
  isExist,
  isExpectedBudget,
  isHighRate,
  isQualitiedDescription,
  isReadableLanguage
} from "./filters/index";

const defaultFilters = [
  isExist,
  isAcceptableSkills,
  isExpectedBudget,
  isReadableLanguage,
  isQualitiedDescription,
  isAcceptAbleProject,
  isHighRate
];

export default async (
  projects: IFLProject[],
  filters: any[] = defaultFilters // @TODO: define Type
): Promise<IFLProject[]> => {
  // 'Filterring Projects'.log()

  const settings = await fetchFilterSetting();
  const newProjects = await filterBags(
    projects,
    settings,
    ...filters
    // isSkills,
    // isEnglish,
    // wordsLength,
    // isIndia,
    // isGoodBudget,
    // isBidable
  );
  return newProjects;
};

export type IprojectFilter = Unpromisify<ReturnType<typeof fetchFilterSetting>>;

const fetchFilterSetting = async () => {
  const {
    data: { filterSettings, ignoredSkills, onlineSkills }
  } = await gqlClient.query<fetchFilterSettings>({
    query: FETCH_FILTER_SETTINGS
  });
  let filterSetting: fetchFilterSettings_filterSettings;
  if (filterSettings.length > 0) {
    filterSetting = filterSettings[0];
  } else {
    throw new Error(`filterring setting haven't be setted`);
  }
  const manipulateSkillsToGetNumberOnly = () => {
    const skills = onlineSkills.reduce<number[]>((prev, now) => {
      now.skills.map(skill => prev.push(skill.skill.id));
      return prev;
    }, []);
    return skills;
  };
  return {
    filterSetting,
    ignoredSkills: ignoredSkills.map(skill => skill.id),
    onlineSkills: manipulateSkillsToGetNumberOnly()
  };
};

const filterBags = async (
  projects: IFLProject[],
  settings: IprojectFilter,
  ...args
) => {
  const newProjects = await args[0](projects, settings);
  const newArgs = args.slice(1);
  if (newArgs.length > 0 && newProjects.length > 0) {
    return filterBags(newProjects, settings, ...newArgs);
  } else {
    return newProjects;
  }
};
