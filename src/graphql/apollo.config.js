module.exports = {
  client: {
    includes: ["./**/*.ts"],
    service: {
      name: "hasura",
      url: "http://dashboard-db.devergroup.io/v1/graphql",
      // optional headers
      headers: {
        "x-hasura-admin-secret": "Thinh123123@"
      }
    }
  }
};
