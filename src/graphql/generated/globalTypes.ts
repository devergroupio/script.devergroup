/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * unique or primary key constraints on table "board"
 */
export enum board_constraint {
  board_pkey = "board_pkey",
}

/**
 * unique or primary key constraints on table "board_issue"
 */
export enum board_issue_constraint {
  board_issue_issue_id_key = "board_issue_issue_id_key",
  board_issue_pkey = "board_issue_pkey",
}

/**
 * update columns of table "board_issue"
 */
export enum board_issue_update_column {
  board_id = "board_id",
  cost = "cost",
  deadline = "deadline",
  description = "description",
  id = "id",
  order = "order",
  prLink = "prLink",
  status = "status",
  tags = "tags",
  title = "title",
  weight = "weight",
}

/**
 * update columns of table "board"
 */
export enum board_update_column {
  archived = "archived",
  created_at = "created_at",
  description = "description",
  id = "id",
  status_list = "status_list",
  title = "title",
}

/**
 * unique or primary key constraints on table "chat_attachment"
 */
export enum chat_attachment_constraint {
  chat_attachment_pkey = "chat_attachment_pkey",
}

/**
 * update columns of table "chat_attachment"
 */
export enum chat_attachment_update_column {
  _data = "_data",
  created_at = "created_at",
  message_id = "message_id",
  thread_id = "thread_id",
  user_id = "user_id",
}

/**
 * unique or primary key constraints on table "chat_log"
 */
export enum chat_log_constraint {
  chat_log_pkey = "chat_log_pkey",
}

/**
 * update columns of table "chat_log"
 */
export enum chat_log_update_column {
  _data = "_data",
  created_at = "created_at",
  id = "id",
  is_notified = "is_notified",
  is_readed = "is_readed",
  thread_id = "thread_id",
}

/**
 * unique or primary key constraints on table "chat_thread"
 */
export enum chat_thread_constraint {
  chat_thread_pkey = "chat_thread_pkey",
}

/**
 * update columns of table "chat_thread"
 */
export enum chat_thread_update_column {
  board_id = "board_id",
  customer_id = "customer_id",
  id = "id",
  isForward = "isForward",
  project_id = "project_id",
  updated_at = "updated_at",
}

/**
 * unique or primary key constraints on table "issue_member"
 */
export enum issue_member_constraint {
  issue_member_member_id2_issue_id_key = "issue_member_member_id2_issue_id_key",
  issue_member_pkey = "issue_member_pkey",
}

/**
 * update columns of table "issue_member"
 */
export enum issue_member_update_column {
  id = "id",
  issue_id = "issue_id",
  member_id = "member_id",
}

/**
 * unique or primary key constraints on table "jobs"
 */
export enum jobs_constraint {
  jobs_pkey = "jobs_pkey",
  jobs_title_key = "jobs_title_key",
}

/**
 * update columns of table "jobs"
 */
export enum jobs_update_column {
  id = "id",
  isIgnored = "isIgnored",
  title = "title",
}

/**
 * unique or primary key constraints on table "outsource_user"
 */
export enum outsource_user_constraint {
  outsource_user_pkey = "outsource_user_pkey",
}

/**
 * update columns of table "outsource_user"
 */
export enum outsource_user_update_column {
  _data = "_data",
  user_id = "user_id",
}

/**
 * unique or primary key constraints on table "portfolio"
 */
export enum portfolio_constraint {
  portfolio_pkey = "portfolio_pkey",
}

/**
 * unique or primary key constraints on table "portfolio_skill"
 */
export enum portfolio_skill_constraint {
  portfolio_skill_pkey = "portfolio_skill_pkey",
}

/**
 * update columns of table "portfolio_skill"
 */
export enum portfolio_skill_update_column {
  id = "id",
  port_id = "port_id",
  skill_id = "skill_id",
}

/**
 * update columns of table "portfolio"
 */
export enum portfolio_update_column {
  created_at = "created_at",
  description = "description",
  excerpt = "excerpt",
  id = "id",
  images = "images",
  link = "link",
  tags = "tags",
}

/**
 * unique or primary key constraints on table "project_award"
 */
export enum project_award_constraint {
  project_award_pkey = "project_award_pkey",
}

/**
 * update columns of table "project_award"
 */
export enum project_award_update_column {
  _data = "_data",
  id = "id",
  pid = "pid",
}

/**
 * unique or primary key constraints on table "projects"
 */
export enum projects_constraint {
  projects_pkey = "projects_pkey",
}

/**
 * update columns of table "projects"
 */
export enum projects_update_column {
  actionText = "actionText",
  appended_descr = "appended_descr",
  bidError = "bidError",
  buyer = "buyer",
  confirm = "confirm",
  created_at = "created_at",
  currency = "currency",
  currencyCode = "currencyCode",
  exchangerate = "exchangerate",
  extended = "extended",
  featured = "featured",
  free_bid_until = "free_bid_until",
  fulltime = "fulltime",
  hidebids = "hidebids",
  id = "id",
  imgUrl = "imgUrl",
  ipcontract = "ipcontract",
  isBid = "isBid",
  jobString = "jobString",
  lastSync = "lastSync",
  linkUrl = "linkUrl",
  listed = "listed",
  maxbudget = "maxbudget",
  minbudget = "minbudget",
  nda = "nda",
  nonpublic = "nonpublic",
  our_cost = "our_cost",
  our_cover_letter = "our_cover_letter",
  projIsHourly = "projIsHourly",
  recruiter = "recruiter",
  status = "status",
  submitDate = "submitDate",
  tags = "tags",
  text = "text",
  time = "time",
  title = "title",
  type = "type",
  updated_at = "updated_at",
  urgent = "urgent",
  userId = "userId",
  userName = "userName",
}

/**
 * unique or primary key constraints on table "projectsjobs"
 */
export enum projectsjobs_constraint {
  projectsjobs_pkey = "projectsjobs_pkey",
}

/**
 * update columns of table "projectsjobs"
 */
export enum projectsjobs_update_column {
  job_id = "job_id",
  project_id = "project_id",
}

/**
 * unique or primary key constraints on table "scripts"
 */
export enum scripts_constraint {
  scripts_pkey = "scripts_pkey",
}

/**
 * update columns of table "scripts"
 */
export enum scripts_update_column {
  created_at = "created_at",
  enable = "enable",
  spinSleepTime = "spinSleepTime",
  uid = "uid",
  updated_at = "updated_at",
}

/**
 * unique or primary key constraints on table "user_skill"
 */
export enum user_skill_constraint {
  user_skill_pkey = "user_skill_pkey",
  user_skill_user_id_skill_id_key = "user_skill_user_id_skill_id_key",
}

/**
 * update columns of table "user_skill"
 */
export enum user_skill_update_column {
  id = "id",
  skill_id = "skill_id",
  user_id = "user_id",
}

/**
 * unique or primary key constraints on table "users"
 */
export enum users_constraint {
  users_id_key = "users_id_key",
  users_pkey = "users_pkey",
}

/**
 * update columns of table "users"
 */
export enum users_update_column {
  auto_bid = "auto_bid",
  created_at = "created_at",
  email = "email",
  first_name = "first_name",
  id = "id",
  isActive = "isActive",
  last_name = "last_name",
  password = "password",
  role = "role",
  status = "status",
  updated_at = "updated_at",
}

/**
 * expression to compare columns of type Boolean. All fields are combined with logical 'AND'.
 */
export interface Boolean_comparison_exp {
  _eq?: boolean | null;
  _gt?: boolean | null;
  _gte?: boolean | null;
  _in?: boolean[] | null;
  _is_null?: boolean | null;
  _lt?: boolean | null;
  _lte?: boolean | null;
  _neq?: boolean | null;
  _nin?: boolean[] | null;
}

/**
 * expression to compare columns of type Float. All fields are combined with logical 'AND'.
 */
export interface Float_comparison_exp {
  _eq?: number | null;
  _gt?: number | null;
  _gte?: number | null;
  _in?: number[] | null;
  _is_null?: boolean | null;
  _lt?: number | null;
  _lte?: number | null;
  _neq?: number | null;
  _nin?: number[] | null;
}

/**
 * expression to compare columns of type Int. All fields are combined with logical 'AND'.
 */
export interface Int_comparison_exp {
  _eq?: number | null;
  _gt?: number | null;
  _gte?: number | null;
  _in?: number[] | null;
  _is_null?: boolean | null;
  _lt?: number | null;
  _lte?: number | null;
  _neq?: number | null;
  _nin?: number[] | null;
}

/**
 * expression to compare columns of type String. All fields are combined with logical 'AND'.
 */
export interface String_comparison_exp {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: string[] | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: string[] | null;
  _nlike?: string | null;
  _nsimilar?: string | null;
  _similar?: string | null;
}

/**
 * expression to compare columns of type bigint. All fields are combined with logical 'AND'.
 */
export interface bigint_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * Boolean expression to filter rows from the table "board". All fields are combined with a logical 'AND'.
 */
export interface board_bool_exp {
  _and?: (board_bool_exp | null)[] | null;
  _not?: board_bool_exp | null;
  _or?: (board_bool_exp | null)[] | null;
  archived?: Boolean_comparison_exp | null;
  created_at?: timestamptz_comparison_exp | null;
  description?: String_comparison_exp | null;
  id?: Int_comparison_exp | null;
  issues?: board_issue_bool_exp | null;
  status_list?: jsonb_comparison_exp | null;
  title?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "board"
 */
export interface board_insert_input {
  archived?: boolean | null;
  created_at?: any | null;
  description?: string | null;
  id?: number | null;
  issues?: board_issue_arr_rel_insert_input | null;
  status_list?: any | null;
  title?: string | null;
}

/**
 * input type for inserting array relation for remote table "board_issue"
 */
export interface board_issue_arr_rel_insert_input {
  data: board_issue_insert_input[];
  on_conflict?: board_issue_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "board_issue". All fields are combined with a logical 'AND'.
 */
export interface board_issue_bool_exp {
  _and?: (board_issue_bool_exp | null)[] | null;
  _not?: board_issue_bool_exp | null;
  _or?: (board_issue_bool_exp | null)[] | null;
  board?: board_bool_exp | null;
  board_id?: Int_comparison_exp | null;
  cost?: Float_comparison_exp | null;
  deadline?: timestamptz_comparison_exp | null;
  description?: String_comparison_exp | null;
  id?: String_comparison_exp | null;
  members?: issue_member_bool_exp | null;
  order?: Int_comparison_exp | null;
  prLink?: String_comparison_exp | null;
  status?: String_comparison_exp | null;
  tags?: jsonb_comparison_exp | null;
  title?: String_comparison_exp | null;
  weight?: Float_comparison_exp | null;
}

/**
 * input type for inserting data into table "board_issue"
 */
export interface board_issue_insert_input {
  board?: board_obj_rel_insert_input | null;
  board_id?: number | null;
  cost?: number | null;
  deadline?: any | null;
  description?: string | null;
  id?: string | null;
  members?: issue_member_arr_rel_insert_input | null;
  order?: number | null;
  prLink?: string | null;
  status?: string | null;
  tags?: any | null;
  title?: string | null;
  weight?: number | null;
}

/**
 * input type for inserting object relation for remote table "board_issue"
 */
export interface board_issue_obj_rel_insert_input {
  data: board_issue_insert_input;
  on_conflict?: board_issue_on_conflict | null;
}

/**
 * on conflict condition type for table "board_issue"
 */
export interface board_issue_on_conflict {
  constraint: board_issue_constraint;
  update_columns: board_issue_update_column[];
  where?: board_issue_bool_exp | null;
}

/**
 * input type for inserting object relation for remote table "board"
 */
export interface board_obj_rel_insert_input {
  data: board_insert_input;
  on_conflict?: board_on_conflict | null;
}

/**
 * on conflict condition type for table "board"
 */
export interface board_on_conflict {
  constraint: board_constraint;
  update_columns: board_update_column[];
  where?: board_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "bot_settings_bidsettings". All fields are combined with a logical 'AND'.
 */
export interface bot_settings_bidsettings_bool_exp {
  _and?: (bot_settings_bidsettings_bool_exp | null)[] | null;
  _not?: bot_settings_bidsettings_bool_exp | null;
  _or?: (bot_settings_bidsettings_bool_exp | null)[] | null;
  bid_rate?: Float_comparison_exp | null;
  id?: Int_comparison_exp | null;
  min_cost?: Float_comparison_exp | null;
  template?: String_comparison_exp | null;
  timer?: Float_comparison_exp | null;
}

/**
 * input type for updating data in table "bot_settings_bidsettings"
 */
export interface bot_settings_bidsettings_set_input {
  bid_rate?: number | null;
  id?: number | null;
  min_cost?: number | null;
  template?: string | null;
  timer?: number | null;
}

/**
 * input type for inserting data into table "bot_training_nottasks"
 */
export interface bot_training_nottasks_insert_input {
  created_at?: any | null;
  id?: number | null;
  phase?: string | null;
  updated_at?: any | null;
}

/**
 * Boolean expression to filter rows from the table "chat_attachment". All fields are combined with a logical 'AND'.
 */
export interface chat_attachment_bool_exp {
  _and?: (chat_attachment_bool_exp | null)[] | null;
  _data?: jsonb_comparison_exp | null;
  _not?: chat_attachment_bool_exp | null;
  _or?: (chat_attachment_bool_exp | null)[] | null;
  created_at?: timestamptz_comparison_exp | null;
  message_id?: bigint_comparison_exp | null;
  thread_id?: Int_comparison_exp | null;
  user_id?: bigint_comparison_exp | null;
}

/**
 * input type for inserting data into table "chat_attachment"
 */
export interface chat_attachment_insert_input {
  _data?: any | null;
  created_at?: any | null;
  message_id?: any | null;
  thread_id?: number | null;
  user_id?: any | null;
}

/**
 * on conflict condition type for table "chat_attachment"
 */
export interface chat_attachment_on_conflict {
  constraint: chat_attachment_constraint;
  update_columns: chat_attachment_update_column[];
  where?: chat_attachment_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "chat_log"
 */
export interface chat_log_arr_rel_insert_input {
  data: chat_log_insert_input[];
  on_conflict?: chat_log_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "chat_log". All fields are combined with a logical 'AND'.
 */
export interface chat_log_bool_exp {
  _and?: (chat_log_bool_exp | null)[] | null;
  _data?: jsonb_comparison_exp | null;
  _not?: chat_log_bool_exp | null;
  _or?: (chat_log_bool_exp | null)[] | null;
  created_at?: timestamptz_comparison_exp | null;
  id?: Int_comparison_exp | null;
  is_notified?: Boolean_comparison_exp | null;
  is_readed?: Boolean_comparison_exp | null;
  thread?: chat_thread_bool_exp | null;
  thread_id?: bigint_comparison_exp | null;
}

/**
 * input type for inserting data into table "chat_log"
 */
export interface chat_log_insert_input {
  _data?: any | null;
  created_at?: any | null;
  id?: number | null;
  is_notified?: boolean | null;
  is_readed?: boolean | null;
  thread?: chat_thread_obj_rel_insert_input | null;
  thread_id?: any | null;
}

/**
 * on conflict condition type for table "chat_log"
 */
export interface chat_log_on_conflict {
  constraint: chat_log_constraint;
  update_columns: chat_log_update_column[];
  where?: chat_log_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "chat_thread". All fields are combined with a logical 'AND'.
 */
export interface chat_thread_bool_exp {
  _and?: (chat_thread_bool_exp | null)[] | null;
  _not?: chat_thread_bool_exp | null;
  _or?: (chat_thread_bool_exp | null)[] | null;
  board_id?: Int_comparison_exp | null;
  customer_id?: bigint_comparison_exp | null;
  id?: bigint_comparison_exp | null;
  isForward?: Boolean_comparison_exp | null;
  messages?: chat_log_bool_exp | null;
  project?: projects_bool_exp | null;
  project_id?: bigint_comparison_exp | null;
  updated_at?: timestamptz_comparison_exp | null;
  user?: outsource_user_bool_exp | null;
}

/**
 * input type for inserting data into table "chat_thread"
 */
export interface chat_thread_insert_input {
  board_id?: number | null;
  customer_id?: any | null;
  id?: any | null;
  isForward?: boolean | null;
  messages?: chat_log_arr_rel_insert_input | null;
  project?: projects_obj_rel_insert_input | null;
  project_id?: any | null;
  updated_at?: any | null;
  user?: outsource_user_obj_rel_insert_input | null;
}

/**
 * input type for inserting object relation for remote table "chat_thread"
 */
export interface chat_thread_obj_rel_insert_input {
  data: chat_thread_insert_input;
  on_conflict?: chat_thread_on_conflict | null;
}

/**
 * on conflict condition type for table "chat_thread"
 */
export interface chat_thread_on_conflict {
  constraint: chat_thread_constraint;
  update_columns: chat_thread_update_column[];
  where?: chat_thread_bool_exp | null;
}

/**
 * expression to compare columns of type date. All fields are combined with logical 'AND'.
 */
export interface date_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * input type for inserting array relation for remote table "issue_member"
 */
export interface issue_member_arr_rel_insert_input {
  data: issue_member_insert_input[];
  on_conflict?: issue_member_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "issue_member". All fields are combined with a logical 'AND'.
 */
export interface issue_member_bool_exp {
  _and?: (issue_member_bool_exp | null)[] | null;
  _not?: issue_member_bool_exp | null;
  _or?: (issue_member_bool_exp | null)[] | null;
  board_issue?: board_issue_bool_exp | null;
  id?: Int_comparison_exp | null;
  issue_id?: String_comparison_exp | null;
  member?: users_bool_exp | null;
  member_id?: Int_comparison_exp | null;
}

/**
 * input type for inserting data into table "issue_member"
 */
export interface issue_member_insert_input {
  board_issue?: board_issue_obj_rel_insert_input | null;
  id?: number | null;
  issue_id?: string | null;
  member?: users_obj_rel_insert_input | null;
  member_id?: number | null;
}

/**
 * on conflict condition type for table "issue_member"
 */
export interface issue_member_on_conflict {
  constraint: issue_member_constraint;
  update_columns: issue_member_update_column[];
  where?: issue_member_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "jobs". All fields are combined with a logical 'AND'.
 */
export interface jobs_bool_exp {
  _and?: (jobs_bool_exp | null)[] | null;
  _not?: jobs_bool_exp | null;
  _or?: (jobs_bool_exp | null)[] | null;
  id?: Int_comparison_exp | null;
  isIgnored?: Boolean_comparison_exp | null;
  portfolios?: portfolio_skill_bool_exp | null;
  projectsjobs?: projectsjobs_bool_exp | null;
  title?: String_comparison_exp | null;
  users?: user_skill_bool_exp | null;
}

/**
 * input type for inserting data into table "jobs"
 */
export interface jobs_insert_input {
  id?: number | null;
  isIgnored?: boolean | null;
  portfolios?: portfolio_skill_arr_rel_insert_input | null;
  projectsjobs?: projectsjobs_arr_rel_insert_input | null;
  title?: string | null;
  users?: user_skill_arr_rel_insert_input | null;
}

/**
 * input type for inserting object relation for remote table "jobs"
 */
export interface jobs_obj_rel_insert_input {
  data: jobs_insert_input;
  on_conflict?: jobs_on_conflict | null;
}

/**
 * on conflict condition type for table "jobs"
 */
export interface jobs_on_conflict {
  constraint: jobs_constraint;
  update_columns: jobs_update_column[];
  where?: jobs_bool_exp | null;
}

/**
 * expression to compare columns of type jsonb. All fields are combined with logical 'AND'.
 */
export interface jsonb_comparison_exp {
  _contained_in?: any | null;
  _contains?: any | null;
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _has_key?: string | null;
  _has_keys_all?: string[] | null;
  _has_keys_any?: string[] | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * Boolean expression to filter rows from the table "outsource_user". All fields are combined with a logical 'AND'.
 */
export interface outsource_user_bool_exp {
  _and?: (outsource_user_bool_exp | null)[] | null;
  _data?: jsonb_comparison_exp | null;
  _not?: outsource_user_bool_exp | null;
  _or?: (outsource_user_bool_exp | null)[] | null;
  user_id?: bigint_comparison_exp | null;
}

/**
 * input type for inserting data into table "outsource_user"
 */
export interface outsource_user_insert_input {
  _data?: any | null;
  user_id?: any | null;
}

/**
 * input type for inserting object relation for remote table "outsource_user"
 */
export interface outsource_user_obj_rel_insert_input {
  data: outsource_user_insert_input;
  on_conflict?: outsource_user_on_conflict | null;
}

/**
 * on conflict condition type for table "outsource_user"
 */
export interface outsource_user_on_conflict {
  constraint: outsource_user_constraint;
  update_columns: outsource_user_update_column[];
  where?: outsource_user_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "portfolio". All fields are combined with a logical 'AND'.
 */
export interface portfolio_bool_exp {
  _and?: (portfolio_bool_exp | null)[] | null;
  _not?: portfolio_bool_exp | null;
  _or?: (portfolio_bool_exp | null)[] | null;
  created_at?: timestamptz_comparison_exp | null;
  description?: String_comparison_exp | null;
  excerpt?: String_comparison_exp | null;
  id?: Int_comparison_exp | null;
  images?: jsonb_comparison_exp | null;
  link?: String_comparison_exp | null;
  skills?: portfolio_skill_bool_exp | null;
  tags?: jsonb_comparison_exp | null;
}

/**
 * input type for inserting data into table "portfolio"
 */
export interface portfolio_insert_input {
  created_at?: any | null;
  description?: string | null;
  excerpt?: string | null;
  id?: number | null;
  images?: any | null;
  link?: string | null;
  skills?: portfolio_skill_arr_rel_insert_input | null;
  tags?: any | null;
}

/**
 * input type for inserting object relation for remote table "portfolio"
 */
export interface portfolio_obj_rel_insert_input {
  data: portfolio_insert_input;
  on_conflict?: portfolio_on_conflict | null;
}

/**
 * on conflict condition type for table "portfolio"
 */
export interface portfolio_on_conflict {
  constraint: portfolio_constraint;
  update_columns: portfolio_update_column[];
  where?: portfolio_bool_exp | null;
}

/**
 * input type for inserting array relation for remote table "portfolio_skill"
 */
export interface portfolio_skill_arr_rel_insert_input {
  data: portfolio_skill_insert_input[];
  on_conflict?: portfolio_skill_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "portfolio_skill". All fields are combined with a logical 'AND'.
 */
export interface portfolio_skill_bool_exp {
  _and?: (portfolio_skill_bool_exp | null)[] | null;
  _not?: portfolio_skill_bool_exp | null;
  _or?: (portfolio_skill_bool_exp | null)[] | null;
  id?: Int_comparison_exp | null;
  port_id?: Int_comparison_exp | null;
  portfolio?: portfolio_bool_exp | null;
  skill?: jobs_bool_exp | null;
  skill_id?: Int_comparison_exp | null;
}

/**
 * input type for inserting data into table "portfolio_skill"
 */
export interface portfolio_skill_insert_input {
  id?: number | null;
  port_id?: number | null;
  portfolio?: portfolio_obj_rel_insert_input | null;
  skill?: jobs_obj_rel_insert_input | null;
  skill_id?: number | null;
}

/**
 * on conflict condition type for table "portfolio_skill"
 */
export interface portfolio_skill_on_conflict {
  constraint: portfolio_skill_constraint;
  update_columns: portfolio_skill_update_column[];
  where?: portfolio_skill_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "project_award". All fields are combined with a logical 'AND'.
 */
export interface project_award_bool_exp {
  _and?: (project_award_bool_exp | null)[] | null;
  _data?: jsonb_comparison_exp | null;
  _not?: project_award_bool_exp | null;
  _or?: (project_award_bool_exp | null)[] | null;
  id?: Int_comparison_exp | null;
  pid?: Int_comparison_exp | null;
}

/**
 * input type for inserting data into table "project_award"
 */
export interface project_award_insert_input {
  _data?: any | null;
  id?: number | null;
  pid?: number | null;
}

/**
 * on conflict condition type for table "project_award"
 */
export interface project_award_on_conflict {
  constraint: project_award_constraint;
  update_columns: project_award_update_column[];
  where?: project_award_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "projects". All fields are combined with a logical 'AND'.
 */
export interface projects_bool_exp {
  _and?: (projects_bool_exp | null)[] | null;
  _not?: projects_bool_exp | null;
  _or?: (projects_bool_exp | null)[] | null;
  actionText?: String_comparison_exp | null;
  appended_descr?: String_comparison_exp | null;
  bidError?: String_comparison_exp | null;
  buyer?: Int_comparison_exp | null;
  confirm?: Int_comparison_exp | null;
  created_at?: timestamptz_comparison_exp | null;
  currency?: String_comparison_exp | null;
  currencyCode?: String_comparison_exp | null;
  employer?: outsource_user_bool_exp | null;
  exchangerate?: Float_comparison_exp | null;
  extended?: String_comparison_exp | null;
  featured?: Boolean_comparison_exp | null;
  free_bid_until?: Int_comparison_exp | null;
  fulltime?: Boolean_comparison_exp | null;
  hidebids?: Boolean_comparison_exp | null;
  id?: Int_comparison_exp | null;
  imgUrl?: String_comparison_exp | null;
  ipcontract?: String_comparison_exp | null;
  isBid?: Boolean_comparison_exp | null;
  jobString?: String_comparison_exp | null;
  lastSync?: timestamptz_comparison_exp | null;
  linkUrl?: String_comparison_exp | null;
  listed?: Boolean_comparison_exp | null;
  maxbudget?: Int_comparison_exp | null;
  minbudget?: Int_comparison_exp | null;
  nda?: Boolean_comparison_exp | null;
  nonpublic?: Boolean_comparison_exp | null;
  our_cost?: Float_comparison_exp | null;
  our_cover_letter?: String_comparison_exp | null;
  projIsHourly?: Boolean_comparison_exp | null;
  projectsjobs?: projectsjobs_bool_exp | null;
  recruiter?: Boolean_comparison_exp | null;
  status?: String_comparison_exp | null;
  submitDate?: date_comparison_exp | null;
  tags?: jsonb_comparison_exp | null;
  text?: String_comparison_exp | null;
  time?: Int_comparison_exp | null;
  title?: String_comparison_exp | null;
  type?: String_comparison_exp | null;
  updated_at?: timestamptz_comparison_exp | null;
  urgent?: Boolean_comparison_exp | null;
  userId?: Int_comparison_exp | null;
  userName?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "projects"
 */
export interface projects_insert_input {
  actionText?: string | null;
  appended_descr?: string | null;
  bidError?: string | null;
  buyer?: number | null;
  confirm?: number | null;
  created_at?: any | null;
  currency?: string | null;
  currencyCode?: string | null;
  employer?: outsource_user_obj_rel_insert_input | null;
  exchangerate?: number | null;
  extended?: string | null;
  featured?: boolean | null;
  free_bid_until?: number | null;
  fulltime?: boolean | null;
  hidebids?: boolean | null;
  id?: number | null;
  imgUrl?: string | null;
  ipcontract?: string | null;
  isBid?: boolean | null;
  jobString?: string | null;
  lastSync?: any | null;
  linkUrl?: string | null;
  listed?: boolean | null;
  maxbudget?: number | null;
  minbudget?: number | null;
  nda?: boolean | null;
  nonpublic?: boolean | null;
  our_cost?: number | null;
  our_cover_letter?: string | null;
  projIsHourly?: boolean | null;
  projectsjobs?: projectsjobs_arr_rel_insert_input | null;
  recruiter?: boolean | null;
  status?: string | null;
  submitDate?: any | null;
  tags?: any | null;
  text?: string | null;
  time?: number | null;
  title?: string | null;
  type?: string | null;
  updated_at?: any | null;
  urgent?: boolean | null;
  userId?: number | null;
  userName?: string | null;
}

/**
 * input type for inserting object relation for remote table "projects"
 */
export interface projects_obj_rel_insert_input {
  data: projects_insert_input;
  on_conflict?: projects_on_conflict | null;
}

/**
 * on conflict condition type for table "projects"
 */
export interface projects_on_conflict {
  constraint: projects_constraint;
  update_columns: projects_update_column[];
  where?: projects_bool_exp | null;
}

/**
 * input type for updating data in table "projects"
 */
export interface projects_set_input {
  actionText?: string | null;
  appended_descr?: string | null;
  bidError?: string | null;
  buyer?: number | null;
  confirm?: number | null;
  created_at?: any | null;
  currency?: string | null;
  currencyCode?: string | null;
  exchangerate?: number | null;
  extended?: string | null;
  featured?: boolean | null;
  free_bid_until?: number | null;
  fulltime?: boolean | null;
  hidebids?: boolean | null;
  id?: number | null;
  imgUrl?: string | null;
  ipcontract?: string | null;
  isBid?: boolean | null;
  jobString?: string | null;
  lastSync?: any | null;
  linkUrl?: string | null;
  listed?: boolean | null;
  maxbudget?: number | null;
  minbudget?: number | null;
  nda?: boolean | null;
  nonpublic?: boolean | null;
  our_cost?: number | null;
  our_cover_letter?: string | null;
  projIsHourly?: boolean | null;
  recruiter?: boolean | null;
  status?: string | null;
  submitDate?: any | null;
  tags?: any | null;
  text?: string | null;
  time?: number | null;
  title?: string | null;
  type?: string | null;
  updated_at?: any | null;
  urgent?: boolean | null;
  userId?: number | null;
  userName?: string | null;
}

/**
 * input type for inserting array relation for remote table "projectsjobs"
 */
export interface projectsjobs_arr_rel_insert_input {
  data: projectsjobs_insert_input[];
  on_conflict?: projectsjobs_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "projectsjobs". All fields are combined with a logical 'AND'.
 */
export interface projectsjobs_bool_exp {
  _and?: (projectsjobs_bool_exp | null)[] | null;
  _not?: projectsjobs_bool_exp | null;
  _or?: (projectsjobs_bool_exp | null)[] | null;
  job?: jobs_bool_exp | null;
  job_id?: Int_comparison_exp | null;
  project?: projects_bool_exp | null;
  project_id?: Int_comparison_exp | null;
}

/**
 * input type for inserting data into table "projectsjobs"
 */
export interface projectsjobs_insert_input {
  job?: jobs_obj_rel_insert_input | null;
  job_id?: number | null;
  project?: projects_obj_rel_insert_input | null;
  project_id?: number | null;
}

/**
 * on conflict condition type for table "projectsjobs"
 */
export interface projectsjobs_on_conflict {
  constraint: projectsjobs_constraint;
  update_columns: projectsjobs_update_column[];
  where?: projectsjobs_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "scripts". All fields are combined with a logical 'AND'.
 */
export interface scripts_bool_exp {
  _and?: (scripts_bool_exp | null)[] | null;
  _not?: scripts_bool_exp | null;
  _or?: (scripts_bool_exp | null)[] | null;
  created_at?: timestamptz_comparison_exp | null;
  enable?: Boolean_comparison_exp | null;
  spinSleepTime?: Int_comparison_exp | null;
  uid?: String_comparison_exp | null;
  updated_at?: timestamptz_comparison_exp | null;
}

/**
 * input type for inserting data into table "scripts"
 */
export interface scripts_insert_input {
  created_at?: any | null;
  enable?: boolean | null;
  spinSleepTime?: number | null;
  uid?: string | null;
  updated_at?: any | null;
}

/**
 * on conflict condition type for table "scripts"
 */
export interface scripts_on_conflict {
  constraint: scripts_constraint;
  update_columns: scripts_update_column[];
  where?: scripts_bool_exp | null;
}

/**
 * expression to compare columns of type timestamptz. All fields are combined with logical 'AND'.
 */
export interface timestamptz_comparison_exp {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: any[] | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: any[] | null;
}

/**
 * input type for inserting array relation for remote table "user_skill"
 */
export interface user_skill_arr_rel_insert_input {
  data: user_skill_insert_input[];
  on_conflict?: user_skill_on_conflict | null;
}

/**
 * Boolean expression to filter rows from the table "user_skill". All fields are combined with a logical 'AND'.
 */
export interface user_skill_bool_exp {
  _and?: (user_skill_bool_exp | null)[] | null;
  _not?: user_skill_bool_exp | null;
  _or?: (user_skill_bool_exp | null)[] | null;
  id?: Int_comparison_exp | null;
  skill?: jobs_bool_exp | null;
  skill_id?: Int_comparison_exp | null;
  user?: users_bool_exp | null;
  user_id?: String_comparison_exp | null;
}

/**
 * input type for inserting data into table "user_skill"
 */
export interface user_skill_insert_input {
  id?: number | null;
  skill?: jobs_obj_rel_insert_input | null;
  skill_id?: number | null;
  user?: users_obj_rel_insert_input | null;
  user_id?: string | null;
}

/**
 * on conflict condition type for table "user_skill"
 */
export interface user_skill_on_conflict {
  constraint: user_skill_constraint;
  update_columns: user_skill_update_column[];
  where?: user_skill_bool_exp | null;
}

/**
 * Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'.
 */
export interface users_bool_exp {
  _and?: (users_bool_exp | null)[] | null;
  _not?: users_bool_exp | null;
  _or?: (users_bool_exp | null)[] | null;
  auto_bid?: Boolean_comparison_exp | null;
  created_at?: timestamptz_comparison_exp | null;
  email?: String_comparison_exp | null;
  first_name?: String_comparison_exp | null;
  id?: Int_comparison_exp | null;
  isActive?: Boolean_comparison_exp | null;
  issue_members?: issue_member_bool_exp | null;
  last_name?: String_comparison_exp | null;
  password?: String_comparison_exp | null;
  role?: String_comparison_exp | null;
  skills?: user_skill_bool_exp | null;
  status?: String_comparison_exp | null;
  updated_at?: timestamptz_comparison_exp | null;
}

/**
 * input type for inserting data into table "users"
 */
export interface users_insert_input {
  auto_bid?: boolean | null;
  created_at?: any | null;
  email?: string | null;
  first_name?: string | null;
  id?: number | null;
  isActive?: boolean | null;
  issue_members?: issue_member_arr_rel_insert_input | null;
  last_name?: string | null;
  password?: string | null;
  role?: string | null;
  skills?: user_skill_arr_rel_insert_input | null;
  status?: string | null;
  updated_at?: any | null;
}

/**
 * input type for inserting object relation for remote table "users"
 */
export interface users_obj_rel_insert_input {
  data: users_insert_input;
  on_conflict?: users_on_conflict | null;
}

/**
 * on conflict condition type for table "users"
 */
export interface users_on_conflict {
  constraint: users_constraint;
  update_columns: users_update_column[];
  where?: users_bool_exp | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
