import hsrClient from "~@/core/modules/hasura.module";
import { chat_log_constraint } from "~@/graphql/generated/globalTypes";
import {
  insertChatLog,
  insertChatLogVariables
} from "~@/graphql/generated/insertChatLog";
import { INSERT_CHAT_LOG } from "~@/graphql/mutation";
export const saveMessageLog = messageBody => {
  const threadId = messageBody.data.thread.id;
  return hsrClient.mutate<insertChatLog, insertChatLogVariables>({
    mutation: INSERT_CHAT_LOG,
    variables: {
      data: [
        {
          _data: messageBody,
          thread_id: threadId
        }
      ],
      on_conflict: {
        constraint: chat_log_constraint.chat_log_pkey,
        update_columns: []
      }
    }
  });
};
