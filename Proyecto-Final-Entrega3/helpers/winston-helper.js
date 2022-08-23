const winston = require("winston");
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: "logs.log",
      level: "warn",
    }),
    new winston.transports.File({
      filename: "logs.log",
      level: "error",
    }),
  ],
});

module.exports = logger;
