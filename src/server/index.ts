import errorHandling from "~@/core/modules/error.module";

import { CONFIG } from "~@/core/utils";
import cronRunning from "~@/microservices/cron.running";
errorHandling.listen();

cronRunning();

import express from "express";
const app = express();
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
app.use(
  cors({
    origin: CONFIG.CORS
  })
);

app.use(
  "/hasura",
  createProxyMiddleware({
    target: `http://${CONFIG.HASURA_ENDPOINT}`,
    pathRewrite: (path, req) => {
      const pathSlashArr = path.split("/").filter(str => str.length > 0);
      if (pathSlashArr.length <= 1) {
        return "/";
      }
      pathSlashArr.shift();

      return "/" + pathSlashArr.join("/");
    },

    ws: true,
    followRedirects: true
  })
);

app.listen(CONFIG.PORT, () => {
  console.log("> listen on port", process.env.PORT);
});
