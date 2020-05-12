import bcrypt from "bcrypt";
// tslint:disable-next-line:no-var-requires
import bodyParser from "body-parser";
import cors from "cors";
import Express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";
import moment from "moment";
import multer from "multer";
import qs from "querystring";
import request from "request";
import * as yup from "yup";
import gqlClient from "~@/core/modules/hasura.module";
import httpClient from "~@/core/modules/http.module";
import { CONFIG } from "~@/core/utils";
import { fetchAndSyncUser } from "~@/core/utils/freelancer";
const tempUpload = multer({
  storage: multer.memoryStorage()
});

import {
  fetchUsersByEmail,
  fetchUsersByEmailVariables
} from "~@/graphql/generated/fetchUsersByEmail";
import { FETCH_USERS_BY_EMAILS } from "~@/graphql/query";
const app = Express.Router();

app.use(
  cors({
    origin: "*" // @TODO:  Will Move it to env
  })
);
app.use(
  bodyParser({
    extended: true
  })
);

const generateToken = payload => {
  return jwt.sign(payload, CONFIG.HASURA_GRAPHQL_JWT_SECRET, {
    algorithm: "HS256",
    subject: "user_authentication",
    expiresIn: "3d"
  });
};

export const apiAuthorizeHanlder = async (req: Request, res: Response) => {
  try {
    let validationSchema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .min(6)
        .required()
    });
    try {
      validationSchema.validateSync(req.body);
    } catch (err) {
      return res.status(401).json({
        error: true,
        message: err.toString()
      });
    }
    const { email, password } = req.body;

    const {
      data: { users }
    } = await gqlClient.query<fetchUsersByEmail, fetchUsersByEmailVariables>({
      query: FETCH_USERS_BY_EMAILS,
      variables: {
        emails: [email]
      }
    });

    if (users.length > 0) {
      const user = users[0];
      const isPassed = bcrypt.compareSync(password, user.password);
      if (isPassed) {
        const jwtToken = generateToken({
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": [user.role],
            "x-hasura-default-role": user.role,
            "x-hasura-user-id": user.email
          }
        });
        return res.json({
          error: false,
          message: JSON.stringify({
            token: jwtToken,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role
          })
        });
      } else {
        return res.status(401).json({
          error: true,
          message: `user or password is incorrect`
        });
      }
    } else {
      console.log("incorrect");
      return res.status(401).json({
        error: true,
        message: `user or password is incorrect`
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: err.toString()
    });
  }
};
app.post("/authorize", apiAuthorizeHanlder);

app.get("/attachment/:message_id/:file", async (req, res) => {
  const messageId = req.params.message_id;
  const file = req.params.file;
  try {
    const { data } = await httpClient.axios.get(
      `https://www.freelancer.com/api/messages/0.1/messages/${messageId}/${file}`,
      {
        responseType: "arraybuffer"
      }
    );
    return res.end(data);
  } catch (err) {
    res.status(500).send({
      isError: true,
      message: err.toString()
    });
  }
});

app.get("/outsource-user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await fetchAndSyncUser(id);
    return res.json({
      isError: false,
      message: user
    });
  } catch (err) {
    return res.status(500).json({
      isError: true,
      message: err.toString()
    });
  }
});
app.post(
  "/message-attachment/:thread_id",
  tempUpload.single("file"),

  async (req, res) => {
    const threadID = req.params.thread_id;
    try {
      request.post(
        `https://www.freelancer.com/api/messages/0.1/threads/${threadID}/messages/?compact=true&new_errors=true`,
        {
          formData: {
            "files[]": {
              value: req.file.buffer,
              options: {
                filename: req.file.originalname,
                contentType: req.file.mimetype
              }
            }
          },
          headers: httpClient.getHeaders()
        },
        (err, response) => {
          if (err) {
            return res.status(500).json({
              isError: true,
              message: err.toString()
            });
          } else {
            return res.json({
              isError: false,
              message: response.body,
              client_message_id: moment.utc().format("X")
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send({
        isError: true,
        message: err.toString()
      });
    }
  }
);
app.post("/message/:thread_id", async (req, res) => {
  const threadID = req.params.thread_id;
  const message = req.body.message;
  console.log(message, threadID);
  try {
    const { data } = await httpClient.axios.post(
      `https://www.freelancer.com/api/messages/0.1/threads/${threadID}/messages/?compact=true&new_errors=true`,
      qs.stringify({
        message,
        source: "chat_box"
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }
    );
    return res.json({
      isError: false,
      message: data,
      client_message_id: moment.utc().format("X")
    });
  } catch (err) {
    res.status(500).send({
      isError: true,
      message: err.toString()
    });
  }
});
export default app;
