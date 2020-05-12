import gql from "graphql-tag";

export const UPSERT_PROJECTS = gql`
  mutation upsertProjects(
    $jobs: [jobs_insert_input!]!
    $jobsUpdateColumns: [jobs_update_column!]!
    $projects: [projects_insert_input!]!
    $projectsUpdateCollumn: [projects_update_column!]!
    $projectsjobs: [projectsjobs_insert_input!]!
  ) {
    insert_jobs(
      objects: $jobs
      on_conflict: { constraint: jobs_pkey, update_columns: $jobsUpdateColumns }
    ) {
      affected_rows
    }
    insert_projects(
      objects: $projects
      on_conflict: {
        constraint: projects_pkey
        update_columns: $projectsUpdateCollumn
      }
    ) {
      affected_rows
    }
    insert_projectsjobs(
      objects: $projectsjobs
      on_conflict: {
        constraint: projectsjobs_pkey
        update_columns: [job_id, project_id]
      }
    ) {
      affected_rows
    }
  }
`;

export const UPSERT_NOTTASKS = gql`
  mutation bulkupsertNotTasks($phases: [bot_training_nottasks_insert_input!]!) {
    insert_bot_training_nottasks(
      objects: $phases
      on_conflict: {
        constraint: bot_training_nottasks_phase_key
        update_columns: []
      }
    ) {
      affected_rows
    }
  }
`;

export const UPSERT_SCRIPTS = gql`
  mutation upsertScripts(
    $scripts: [scripts_insert_input!]!
    $on_conflict: scripts_on_conflict!
  ) {
    insert_scripts(objects: $scripts, on_conflict: $on_conflict) {
      affected_rows
    }
  }
`;

export const UPSERT_JOBS = gql`
  mutation upsertJobs(
    $jobs: [jobs_insert_input!]!
    $on_conflict: jobs_on_conflict
  ) {
    insert_jobs(objects: $jobs, on_conflict: $on_conflict) {
      affected_rows
    }
  }
`;

export const CHANGE_SCRIPT_STATUS = gql`
  mutation updateScriptStatus($uid: String!, $status: Boolean!) {
    update_scripts(where: { uid: { _eq: $uid } }, _set: { enable: $status }) {
      affected_rows
    }
  }
`;

export const UPDATE_BID_SETTINGS = gql`
  mutation updateBidSettings(
    $set: bot_settings_bidsettings_set_input!
    $where: bot_settings_bidsettings_bool_exp!
  ) {
    update_bot_settings_bidsettings(_set: $set, where: $where) {
      affected_rows
    }
  }
`;

export const UPDATE_PROJECT_STATUS = gql`
  mutation updateProjectStatus($id: Int!, $status: Int) {
    update_projects(where: { id: { _eq: $id } }, _set: { confirm: $status }) {
      affected_rows
    }
  }
`;

export const INSERT_THREAD = gql`
  mutation upsertThread(
    $object: chat_thread_insert_input!
    $on_conflict: chat_thread_on_conflict
  ) {
    insert_chat_thread_one(object: $object, on_conflict: $on_conflict) {
      id
    }
  }
`;

export const UPDATE_PROJECT_BID_DATA = gql`
  mutation updateProjectBD(
    $id: Int
    $our_cost: Float!
    $our_cover_letter: String!
  ) {
    update_projects(
      where: { id: { _eq: $id } }
      _set: { our_cost: $our_cost, our_cover_letter: $our_cover_letter }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_PROJECT_STATE = gql`
  mutation updateProjectState(
    $projectSet: projects_set_input!
    $projectWhere: projects_bool_exp!
    $projectArwards: [project_award_insert_input!]!
    $on_conflict: project_award_on_conflict
  ) {
    update_projects(_set: $projectSet, where: $projectWhere) {
      affected_rows
    }
    insert_project_award(objects: $projectArwards, on_conflict: $on_conflict) {
      affected_rows
    }
  }
`;

export const INSERT_CHAT_LOG = gql`
  mutation insertChatLog(
    $data: [chat_log_insert_input!]!
    $on_conflict: chat_log_on_conflict!
  ) {
    insert_chat_log(objects: $data, on_conflict: $on_conflict) {
      affected_rows
    }
  }
`;

export const INSERT_CHAT_ATTACHMENT = gql`
  mutation insertChatAttachMent(
    $object: chat_attachment_insert_input!
    $conflict: chat_attachment_on_conflict
  ) {
    insert_chat_attachment_one(object: $object, on_conflict: $conflict) {
      message_id
    }
  }
`;

export const UPSERT_OUTSOURCE_USER = gql`
  mutation upsertOutsourceUser(
    $obj: outsource_user_insert_input!
    $conflict: outsource_user_on_conflict
  ) {
    insert_outsource_user_one(object: $obj, on_conflict: $conflict) {
      _data
      user_id
    }
  }
`;
