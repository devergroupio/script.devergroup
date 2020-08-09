import errorHandling from "~@/core/modules/error.module";

import bodyParser from "body-parser";
import path from "path";
import { CONFIG } from "~@/core/utils";
import cronRunning from "~@/microservices/cron.running";
errorHandling.listen();

cronRunning();

import express from "express";
const app = express();
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import { sendProjectNotification } from "~@/core/utils/send_email";
import api from "~@/microservices/api";
import { listen } from "~@/microservices/socket";
// Listen webSocket
if (CONFIG.IS_LISTEN_WS) {
  listen();
}
if (CONFIG.IS_ENABLE_API) {
  app.use(
    cors({
      origin: CONFIG.CORS
    })
  );
  app.use(
    "/api",
    bodyParser.json({}),
    bodyParser.urlencoded({
      extended: true
    }),
    api
  );
  app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

  app.use(
    "/hasura",
    createProxyMiddleware({
      target: CONFIG.HASURA_ENDPOINT,
      // tslint:disable-next-line:no-shadowed-variable
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
  app.post("/webhook/unconfirm_project", bodyParser.json(), (req, res) => {
    const {
      event: {
        data: { new: project }
      }
    } = req.body;
    if (project.confirm === 0) {
      sendProjectNotification({
        notification: {
          link: "http://no",
          msg: `${project.minbudget} - ${project.maxbudget} ${
            project.currencyCode
          }`,
          title: `WAITING: ${project.title}`
        },
        to: "devergroupnotification@gmail.com"
      });
      res.json({
        isError: false,
        message: "successfull"
      });
    }
  });
  app.listen(CONFIG.PORT, () => {
    console.log("> application listen on port", process.env.PORT);
  });
}
