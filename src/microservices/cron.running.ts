import forever from "forever";
import glob from "glob";
import path from "path";
import gqlClient from "~@/core/modules/hasura.module";
import logger from "~@/core/modules/log.module";
import { CONFIG } from "~@/core/utils";
import {
  fetchScriptByUid,
  fetchScriptByUidVariables
} from "~@/graphql/generated/fetchScriptByUid";
import { scripts_constraint } from "~@/graphql/generated/globalTypes";
import {
  upsertScripts,
  upsertScriptsVariables
} from "~@/graphql/generated/upsertScripts";
import { UPSERT_SCRIPTS } from "~@/graphql/mutation";
import { FETCH_SCRIPT_BY_UID } from "~@/graphql/query";

export const getScripts = async () => {
  const scriptPattern = path.join(__dirname, "./scripts/*.script.+(js|ts)");
  const files = glob.sync(scriptPattern);
  let serializedScripts = files.map(file => {
    const uid = path.basename(file).split(".")[0];
    return {
      uid,
      path: file
    };
  });
  serializedScripts = serializedScripts.filter(script => {
    return !CONFIG.EXCLUDE_SCRIPTS.includes(script.uid);
  });
  console.log(serializedScripts);
  await gqlClient.mutate<upsertScripts, upsertScriptsVariables>({
    mutation: UPSERT_SCRIPTS,
    variables: {
      scripts: serializedScripts.map(script => ({
        uid: script.uid
      })),
      on_conflict: {
        constraint: scripts_constraint.scripts_pkey,
        update_columns: []
      }
    }
  });
  logger.info("Total Scripts: %s was Synced", serializedScripts.length);
  return serializedScripts;
};

export const fetchScriptInfo = async (uid: string) => {
  const {
    // tslint:disable-next-line:no-shadowed-variable
    data: { scripts }
  } = await gqlClient.query<fetchScriptByUid, fetchScriptByUidVariables>({
    query: FETCH_SCRIPT_BY_UID,
    variables: {
      uid
    }
  });
  if (scripts.length === 0) {
    throw new Error(`script uid: ${uid} coudn't be found in database`);
  }
  return scripts[0];
};

const runFile = (scriptPath: string) => {
  if (process.env.MODE === "production") {
    return `cross-env MODE=production node -r ./dotenv.config -r module-alias/register ${scriptPath}`;
  } else {
    return `cross-env MODE=development node -r ts-node/register -r tsconfig-paths/register ${scriptPath}`;
  }
};
export default async () => {
  const scripts = await getScripts();
  scripts.map(script => {
    forever.start(script.path, {
      command: runFile(script.path),
      uid: script.uid,
      env: {
        minUptime: 0,
        script_uid: script.uid,
        killTree: true
      }
    });
  });
};
