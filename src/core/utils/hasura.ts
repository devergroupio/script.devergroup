import hsrClient from "~@/core/modules/hasura.module";
import {
  fetchOSUserByID,
  fetchOSUserByIDVariables
} from "~@/graphql/generated/fetchOSUserByID";
import {
  outsource_user_constraint,
  outsource_user_update_column
} from "~@/graphql/generated/globalTypes";
import {
  upsertOutsourceUser,
  upsertOutsourceUserVariables
} from "~@/graphql/generated/upsertOutsourceUser";
import { UPSERT_OUTSOURCE_USER } from "~@/graphql/mutation";
import { FETCH_OS_USER_BY_ID /* FETCH_USER_SKILLS */ } from "~@/graphql/query";
import { fetchAndSyncUser } from "./freelancer";

// import {
//   fetchTotalUserSkills,
//   fetchTotalUserSkills_users,
//   fetchTotalUserSkills_users_skills,
//   fetchTotalUserSkills_users_skills_skill
// } from "~@/graphql/generated/fetchTotalUserSkills";
export const upsertOSUser = (userId, data) => {
  return hsrClient.mutate<upsertOutsourceUser, upsertOutsourceUserVariables>({
    mutation: UPSERT_OUTSOURCE_USER,
    variables: {
      obj: {
        _data: data,
        user_id: userId
      },
      conflict: {
        constraint: outsource_user_constraint.outsource_user_pkey,
        update_columns: [outsource_user_update_column._data]
      }
    }
  });
};

export const getOSUByID = async id => {
  const {
    data: { user }
  } = await hsrClient.query<fetchOSUserByID, fetchOSUserByIDVariables>({
    query: FETCH_OS_USER_BY_ID,
    variables: {
      user_id: id
    }
  });
  return user;
};

export const syncOSUserIfNotExisted = async id => {
  if (!id) {
    return null;
  }
  const user = await getOSUByID(id);
  if (user) {
    return user;
  } else {
    return fetchAndSyncUser(id);
  }
};

// export const fetchAvailableSkills = async (): Promise<
//   fetchTotalUserSkills_users_skills_skill[]
// > => {
//   const {
//     data: { users }
//   } = await hsrClient.query<fetchTotalUserSkills>({
//     query: FETCH_USER_SKILLS
//   });
//   if (users.length < 0) {
//     return [];
//   } else {
//     const skills = users.reduce((prev, now) => {
//       now.skills.map(skill => prev.push(skill.skill));
//       return prev;
//     }, []);
//     return skills;
//   }
// };
