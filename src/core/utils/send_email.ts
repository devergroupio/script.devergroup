import bluebird from "bluebird";
import ejs from "ejs";
import fs from "fs";
import sendInstance from "gmail-send";
import inlineCss from "inline-css";
import path from "path";
const ejsPromise = bluebird.promisifyAll(ejs);
export const sendMail = async (opts: {
  to: string;
  subject: string;
  html: string;
}) => {
  const send = sendInstance({
    user: "noreply.devergroup.io@gmail.com",
    pass: "qjrqldpvyisstqkp",
    to: opts.to,
    subject: opts.subject
  });
  return send({
    html: opts.html
  });
};

export const sendProjectNotification = async (opts: {
  to: string;
  notification: {
    msg: string;
    title: string;
    link: string;
  };
}) => {
  const html = await ejsPromise.renderFile(
    path.join(__dirname, "./templates/chat-notifcation.template.ejs"),
    opts.notification
  );
  const finalHtml = await inlineCss(html, {
    extraCss: fs
      .readFileSync(
        path.join(__dirname, "./templates/chat-notifcation.template.css")
      )
      .toString(),
    url: "https://dashboard.devergroup.io"
  });
  return sendMail({
    to: opts.to,
    html: finalHtml,
    subject: opts.notification.title
  });
};
export const sendChatNotification = async (opts: {
  to: string;
  notification: {
    msg: string;
    link: string;
  };
}) => {
  const html = await ejsPromise.renderFile(
    path.join(__dirname, "./templates/chat-notifcation.template.ejs"),
    opts.notification
  );
  const finalHtml = await inlineCss(html, {
    extraCss: fs
      .readFileSync(
        path.join(__dirname, "./templates/chat-notifcation.template.css")
      )
      .toString(),
    url: "https://dashboard.devergroup.io"
  });
  return sendMail({
    to: opts.to,
    html: finalHtml,
    subject: "Customer is messaging you on our platform!"
  });
};
