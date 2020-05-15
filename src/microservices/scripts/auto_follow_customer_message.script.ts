const scriptUid = process.env.script_uid;
import _ from "lodash";
import errorHandling from "~@/core/modules/error.module";

import hsrClient from "~@/core/modules/hasura.module";
import { sendChatNotification } from "~@/core/utils/send_email";
import { getUnsupportedCustomer } from "~@/graphql/generated/getUnsupportedCustomer";
import {
  markThreadAsNotified,
  markThreadAsNotifiedVariables
} from "~@/graphql/generated/markThreadAsNotified";
import { MARK_THREAD_AS_NOTIFIED } from "~@/graphql/mutation";
import { GET_UNSUPPORTED_MESSAGE } from "~@/graphql/query";
import { fetchScriptInfo } from "../cron.running";
errorHandling.listen();

export const SCRIPT_CONTENT = async () => {
  const {
    data: { unsupported_customer }
  } = await hsrClient.query<getUnsupportedCustomer>({
    query: GET_UNSUPPORTED_MESSAGE
  });
  if (unsupported_customer.length > 0) {
    await Promise.all(
      unsupported_customer.map(async unsupported => {
        const lastMsg = unsupported.last_message;
        const threadId = unsupported.thread.id;
        const skills = _.get(unsupported, "thread.project.skills", []);
        const availableUsers = skills.map(skill => {
          return _.get(skill, "skill.users", []);
        });
        const users = _.union(...availableUsers);

        // Send message to all users
        await Promise.all(
          users.map(async ({ user }) => {
            return sendChatNotification({
              notification: {
                link: `https://dashboard.devergroup.io/chat/${threadId}`,
                msg: lastMsg
              },
              to: user.email
            });
          })
        );

        // Mark this thread as notifed
        return hsrClient.mutate<
          markThreadAsNotified,
          markThreadAsNotifiedVariables
        >({
          mutation: MARK_THREAD_AS_NOTIFIED,
          variables: {
            thread_id: threadId
          }
        });
      })
    );
  }
};

(async () => {
  // TODO add watch dog
  const scriptInfo = await fetchScriptInfo(scriptUid);
  if (!scriptInfo.enable) {
    logger.warn("script: %s is locking now", scriptUid);
    setTimeout(() => {
      process.exit(0);
    }, scriptInfo.spinSleepTime * 1000);
  } else {
    logger.info(
      "will run script: %s  next %s seconds",
      scriptUid,
      scriptInfo.spinSleepTime
    );
    setTimeout(async () => {
      await SCRIPT_CONTENT();
    }, scriptInfo.spinSleepTime * 1000);
  }
})();
