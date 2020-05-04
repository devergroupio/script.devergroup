import _ from "lodash";
import gqlClient from "~@/core/modules/hasura.module";
import {
  bulkupsertNotTasks,
  bulkupsertNotTasksVariables
} from "~@/graphql/generated/bulkupsertNotTasks";
import { bot_training_nottasks_insert_input } from "~@/graphql/generated/globalTypes";
import { UPSERT_NOTTASKS } from "~@/graphql/mutation";
import { ITraining } from "../../functions/fl_bid_job";
// const MAX_BID_LENGTH = 1500;

const MAX_TASK_WORDS_LENGTH = 50;
const collectSuitedSentences = (desc: string, listRegexPattern: RegExp[]) => {
  const iterableCollection = {
    [Symbol.iterator]() {
      let sentences: string[] = [];
      let currentIndex = 0;
      return {
        next() {
          if (sentences.length <= 1) {
            if (currentIndex > listRegexPattern.length - 1) {
              return {
                value: sentences,
                done: true
              };
            }
            sentences = descToSentences(desc, listRegexPattern[currentIndex]);

            if (sentences.length > 0) {
              return {
                value: sentences,
                done: true
              };
            }
            currentIndex++;
            return {
              value: sentences,
              done: false
            };
          } else {
            return {
              value: sentences,
              done: true
            };
          }
        }
      };
    }
  };

  const iterable = iterableCollection[Symbol.iterator]();
  do {
    iterable.next();
  } while (!iterable.next().done);

  return iterable.next().value;
};

export default (
  description: string,
  detectPhases: ITraining["detectPhases"]
) => {
  const detectPhaseOnlyTexts = detectPhases.map(phase => phase.phase);
  const sentences = collectSuitedSentences(description, [
    new RegExp(/(?<!(u|https{0,1}:\/\/\w{1,}))\.{1,}(?!(s|com|es|go|do))/gi),
    new RegExp(/\;{1,}/),
    new RegExp(/\-{1,}/)
  ]);
  let keys = getKeyTask(sentences, detectPhaseOnlyTexts);
  return keys;
};

const chooseLongestPhase = (phases: string[]) => {
  return _.maxBy(phases, phase => {
    return phase.split(/\s{1,}/g).length;
  });
};

let chooseSuitedPhaseCACHED = "";
const getSuitedPhase = (phase?: string) => {
  if (!phase) {
    return undefined;
  }
  phase = phase
    .trim()
    .replace(/^((and|or|hello|today|now)(\s|\,|\!){1,})*/g, "")
    .replace(/\.{1,}$/, ""); // @TODO: make it dynamic
  if (phase.split(/\s{1,}/g).length > MAX_TASK_WORDS_LENGTH) {
    if (chooseSuitedPhaseCACHED === phase) {
      return undefined;
    }
    chooseSuitedPhaseCACHED = phase;
    const splitPhases = collectSuitedSentences(phase, [
      new RegExp(/\,{1,}/),
      new RegExp(/\;{1,}/),
      new RegExp(/(!https{0,1})\:{1,}/)
    ]);

    const longestPhase = chooseLongestPhase(splitPhases);
    if (longestPhase && longestPhase.length > 0) {
      return getSuitedPhase(longestPhase);
    }
    return undefined;
  }
  return phase;
};

const descToSentences = (desc: string, endRegex: RegExp) => {
  desc = desc.toLowerCase();
  const sentences = desc.replace(/\n{1,}/g, "").split(endRegex);
  return sentences
    .map(sentence => {
      sentence = getSuitedPhase(sentence);
      return sentence;
    })
    .filter(v => v !== undefined && v.length > 0);
};

const isTask = (sentence: string, detectPhases: string[]) => {
  const sortedDetectPhases = _.sortBy(
    detectPhases,
    phase => phase.length
  ).reverse();
  const MIN_TASK_WORDS_LENGTH = 5; // @TODO: make it dynamic
  let isOk = false;

  if (sentence.split(/\s{1,}/g).length >= MIN_TASK_WORDS_LENGTH) {
    sortedDetectPhases.map(word => {
      if (sentence.trim().indexOf(word.toLowerCase()) !== -1) {
        isOk = true;
      }
    });
  }
  return isOk;
};

const getKeyTask = async (descArray: string[], detectwords: string[]) => {
  const listTasks = [];
  const listNotTasks = [];
  descArray.map(sentence => {
    if (isTask(sentence, detectwords)) {
      listTasks.push(beautifyTask(sentence));
    } else {
      listNotTasks.push(sentence);
    }
  });
  await bulkUpsertNotTaskList(listNotTasks);
  return listTasks;
};
const bulkUpsertNotTaskList = async (phases: string[]) => {
  await gqlClient.mutate<bulkupsertNotTasks, bulkupsertNotTasksVariables>({
    mutation: UPSERT_NOTTASKS,
    variables: {
      phases: phases.map(
        (phase): bot_training_nottasks_insert_input => ({
          phase
        })
      )
    }
  });
};

const beautifyTask = (sentence: string) => {
  const task = sentence
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/ am /gi, " are ")
    .replace(/ im | \.im /gi, "you are")
    .replace(/i | i | me |we | we | us /gi, " you ")
    .replace(/my |our | my | our /gi, " your ")
    .replace(/\s+/g, " ")
    .replace(/i\'d|i would/gi, "You would")
    .trim();
  return task;
};
