import gql from "graphql-tag";

export const FETCH_PROJECT_TO_FOLLOW = gql`
  query fetchProjectTofollow($lastSyncFilter: timestamptz_comparison_exp!) {
    projects(
      where: {
        status: { _eq: "NEW", _nin: ["DELETED"] }
        lastSync: $lastSyncFilter
      }
      limit: 100
      order_by: { submitDate: desc_nulls_last }
    ) {
      id
      status
    }
  }
`;
export const FETCH_PROJECTS_BY_ID = gql`
  query fetchProjectById($projectId: Int!) {
    projects(where: { id: { _eq: $projectId } }) {
      jobs: projectsjobs {
        job {
          id
          title
        }
      }
      actionText
      appended_descr
      bidError
      buyer
      confirm
      currency
      currencyCode
      exchangerate
      extended
      featured
      free_bid_until
      fulltime
      hidebids
      id
      imgUrl
      ipcontract
      isBid
      jobString
      linkUrl
      listed
      maxbudget
      minbudget
      nda
      nonpublic
      our_cost
      projIsHourly
      recruiter
      submitDate
      text
      time
      title
      type
      urgent
      userId
      our_cover_letter
      userName
      created_at
      updated_at
    }
  }
`;

export const FETCH_FILTER_SETTINGS = gql`
  query fetchFilterSettings {
    filterSettings: bot_settings_filterwork(limit: 1) {
      id
      max_budget
      min_budget
      exchange_rate
      description_length
    }
    ignoredSkills: jobs(where: { isIgnored: { _eq: true } }) {
      id
      title
    }
  }
`;

export const FETCH_BID_SETTINGS = gql`
  query fetchBidSettings {
    bot_settings_bidsettings(limit: 1) {
      bid_rate
      min_cost
      timer
      id
      template
    }
    scripts {
      enable
      uid
      spinSleepTime
    }
  }
`;

export const FETCH_TRAINING = gql`
  query fetchTraining {
    detectPhases: bot_training_detectphases {
      id
      phase
    }
  }
`;

export const FETCH_NEEDCONFIRM_PROJECTS = gql`
  query fetchNeedConfirmProjects(
    $timeMin: timestamptz!
    $timeMax: timestamptz!
  ) {
    projects: projects(
      where: {
        _and: [
          { isBid: { _eq: false } }
          { created_at: { _gte: $timeMin, _lte: $timeMax } }
          { confirm: { _eq: 0 } }
        ]
      }
    ) {
      id
    }
  }
`;
export const FETCH_ONGOING_BIDINFO = gql`
  query fetchOnGoingBidInfo($timeMin: timestamptz!, $timeMax: timestamptz!) {
    projects: projects(
      where: {
        _and: [
          { isBid: { _eq: false } }
          { created_at: { _gte: $timeMin, _lte: $timeMax } }
          { confirm: { _in: [0, 1] } }
        ]
      }
    ) {
      jobs: projectsjobs {
        job {
          id
          title
        }
      }
      actionText
      appended_descr
      bidError
      buyer
      confirm
      currency
      currencyCode
      exchangerate
      extended
      featured
      free_bid_until
      fulltime
      hidebids
      id
      imgUrl
      ipcontract
      isBid
      jobString
      linkUrl
      listed
      maxbudget
      minbudget
      nda
      nonpublic
      our_cost
      projIsHourly
      recruiter
      submitDate
      text
      time
      title
      type
      urgent
      userId
      our_cover_letter
      userName
      created_at
      updated_at
    }
    bidSettings: bot_settings_bidsettings(limit: 1) {
      bid_rate
      id
      min_cost
      timer
    }
  }
`;

export const FETCH_SCRIPT_BY_UID = gql`
  query fetchScriptByUid($uid: String!) {
    scripts(where: { uid: { _eq: $uid } }) {
      created_at
      enable
      spinSleepTime
      uid
      updated_at
    }
  }
`;

export const FETCH_JOBS = gql`
  query fetchJobs {
    jobs {
      id
      title
      isIgnored
    }
  }
`;

export const FETCH_USERS_BY_EMAILS = gql`
  query fetchUsersByEmail($emails: [String!]!) {
    users(where: { email: { _in: $emails } }) {
      email
      first_name
      password
      last_name
      role
    }
  }
`;
const ProjectInfoFragMent = gql`
  fragment projectData on projects {
    id
    appended_descr
    bidError
    jobString
    confirm
    currency
    title
    currencyCode
    maxbudget
    minbudget
    projIsHourly
    submitDate
    isBid
    our_cost
    linkUrl
    our_cover_letter
    bidError
    created_at
  }
`;
export const FETCH_LAST_PROJECTS = gql`
  ${ProjectInfoFragMent}
  query FETCH_LAST_PROJECTS {
    projects(limit: 50, order_by: { created_at: desc }) {
      ...projectData
    }
  }
`;

export const FETCH_OS_USER_BY_ID = gql`
  query fetchOSUserByID($user_id: bigint!) {
    user: outsource_user_by_pk(user_id: $user_id) {
      user_id
      country: _data(path: "location.country.name")
      timezone: _data(path: "timezone.timezone")
      username: _data(path: "username")
      public_name: _data(path: "public_name")
      email_verified: _data(path: "status.email_verified")
      payment_verified: _data(path: "status.payment_verified")
      identity_verified: _data(path: "status.identity_verified")
    }
  }
`;

export const FETCH_THREAD_BY_ID = gql`
  query fetchThreadByID($thread_id: bigint!) {
    chat_thread_by_pk(id: $thread_id) {
      customer_id
      id
      project_id
      updated_at
      user {
        user_id
        country: _data(path: "location.country.name")
        timezone: _data(path: "timezone.timezone")
        username: _data(path: "username")
        public_name: _data(path: "public_name")
        email_verified: _data(path: "status.email_verified")
        payment_verified: _data(path: "status.payment_verified")
        identity_verified: _data(path: "status.identity_verified")
      }
      messages(order_by: { created_at: desc }, limit: 40) {
        message_id: _data(path: "data.id")
        message: _data(path: "data.message")
        onwer_id: _data(path: "data.from_user")
        message_source: _data(path: "data.message_source")
        thread_id
        is_readed
        created_at
        id
      }
    }
  }
`;

export const GET_UNSUPPORTED_MESSAGE = gql`
  query getUnsupportedCustomer {
    unsupported_customer(where: { thread: { id: { _is_null: false } } }) {
      last_message: _data(path: "data.message")
      thread {
        id
        project {
          id
          skills: projectsjobs {
            skill: job {
              users(where: { user: { status: { _nin: ["offline"] } } }) {
                user {
                  status
                  email
                }
              }
              id
              title
            }
          }
        }
      }
    }
  }
`;
