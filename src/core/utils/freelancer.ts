import httpCLient from "~@/core/modules/http.module";
import { upsertOSUser } from "./hasura";
export const fetchUserById = async id => {
  const { data } = await httpCLient.axios.get(
    `https://www.freelancer.com/api/users/0.1/users/${id}/`
  );
  if (data.status === "success") {
    return data.result;
  } else {
    throw new Error(data.result);
  }
};

export const fetchAndSyncUser = async id => {
  const { data } = await httpCLient.axios.get(
    `https://www.freelancer.com/api/users/0.1/users/${id}/`
  );
  if (data.status === "success") {
    upsertOSUser(id, data.result);
    return data.result;
  } else {
    throw new Error(data.result);
  }
};
