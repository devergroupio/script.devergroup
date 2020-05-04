module.exports = {
  client: {
    includes: ["./**/*.ts"],
    service: {
      name: "hasura",
      url: "https://core.devergroup.io/hasura/v1/graphql",
      // optional headers
      headers: {
        "x-hasura-admin-secret": "Devergroup1212@@"
      }
    }
  }
};
