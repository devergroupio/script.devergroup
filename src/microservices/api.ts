import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import Express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";
import * as yup from "yup";
import gqlClient from "~@/core/modules/hasura.module";
import httpClient from "~@/core/modules/http.module";
import { CONFIG } from "~@/core/utils";
import {
  fetchUsersByEmail,
  fetchUsersByEmailVariables
} from "~@/graphql/generated/fetchUsersByEmail";
import { FETCH_USERS_BY_EMAILS } from "~@/graphql/query";
const app = Express();

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

app.get("/attachment/:message_id/:attachment_id/:file", (req, res) => {
  const messageId = req.query.messageId;
  const attachmentId = req.query.attachmentId;
  const file = req.query.file;
});
export default app;
