const withLess = require("@zeit/next-less");
const withCss = require("@zeit/next-css");
require("./dotenv.config");
const customConfig = {
  publicRuntimeConfig: {
    HASURA_ENDPOINT: process.env.HASURA_ENDPOINT,
    HASURA_GRAPHQL_ADMIN_SECRET: process.env.HASURA_GRAPHQL_ADMIN_SECRET
  }
};
module.exports = withCss(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
      overrides: true
    },
    ...customConfig,
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === "function") {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === "function" ? [] : origExternals)
        ];
        config.module.rules.unshift({
          test: antStyles,
          use: "null-loader"
        });
      }
      config.module.rules.push({
        test: /\.mp3$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]"
          }
        }
      });
      return config;
    }
  })
);
