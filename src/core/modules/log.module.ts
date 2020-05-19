// const EventEmitter = require('events');
// const moment = require('moment');
// const firebaseModule = require('./firebase.module');
// class Logger {
//   constructor() {
//     this.event = new EventEmitter();
//     this.logs = [];
//     this.event.on('logs', message => {
//       if (this.logs.length >= 40) {
//         firebaseModule.table.logs.child('/running').selfDesTroy();
//       }
//       firebaseModule.table.logs.child('/running').create(message);
//     });
//   }
//   put(message) {
//     console.log(moment().format('DD/MM/YY HH:MM:SS') + ' ' + message);
//     this.event.emit(
//       'logs',
//       moment().format('DD/MM/YY HH:MM:SS') + ' ' + message,
//     );
//   }
//   listen() {
//     return this.event;
//   }
// }
// const logger = new Logger();
// String.prototype.log = function() {
//   logger.put(this);
// };
// exports.logger = logger;
import * as Sentry from "@sentry/node";
import { SentryTransport, SentryTransportOpts } from "sentry-transport-winston";

const opts: SentryTransportOpts = {
  sentryOpts: {
    // @ts-ignore
    dns:
      "https://6f90674b239842bea1b4d9d5d78985bc@o394239.ingest.sentry.io/5245806"
  }
};
const sentry = new SentryTransport(opts);

import moment from "moment";
import winston from "winston";
const colorizer = winston.format.colorize();
const consoleLogFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.simple(),
  winston.format.splat(),
  winston.format.printf(msg =>
    colorizer.colorize(
      msg.level,
      `${moment
        .utc(msg.timestamp)
        .utcOffset(7)
        .format("DD/MM/YYYY hh:mm:ss")} - ${msg.level}: ${msg.message}`
    )
  )
);
const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.simple(),
  winston.format.splat(),
  winston.format.printf(
    msg =>
      `${moment
        .utc(msg.timestamp)
        .utcOffset(7)
        .format("DD/MM/YYYY hh:mm:ss")} - ${msg.level}: ${msg.message}`
  )
);
const getTransports = () => {
  const transports = [];
  if (process.env.MODE === "production") {
    transports.push(
      // new winston.transports.File({
      //   level: "error",
      //   filename: "logs/errors.log",
      //   format: productionFormat
      // }),
      // new winston.transports.File({
      //     filename: "logs/all.log",
      //     format: productionFormat
      // }),
      sentry,
      new winston.transports.Console({
        format: productionFormat
      })
    );
  } else {
    transports.push(
      new winston.transports.Console({
        format: consoleLogFormat
      })
    );
  }
  return transports;
};

export default winston.createLogger({
  transports: getTransports()
});
