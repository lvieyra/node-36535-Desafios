const log4js = require("log4js");

log4js.configure({
  appenders: {
    loggerConsolaInfo: { type: "console" },
    loggerFileWarning: { type: "file", filename: "warn.log" },
    loggerFileError: { type: "file", filename: "error.log" },
    warnLevelFilter: {
      type: "logLevelFilter",
      level: "warn",
      appender: "loggerFileWarning",
    },
    errorLevelFilter: {
      type: "logLevelFilter",
      level: "error",
      appender: "loggerFileError",
    },
  },
  categories: {
    default: {
      appenders: ["loggerConsolaInfo"],
      level: "all",
    },
    dev: {
      appenders: ["loggerConsolaInfo", "warnLevelFilter", "errorLevelFilter"],
      level: "all",
    },
  },
});

const logger = log4js.getLogger("dev");



const middleLogger = (req, res, next) => {
    logger.info(`Ruta: ${req.path} Metodo: ${req.method}`);
    next();
  };
  
  const middleLoggerWarm = (req, res, next) => {
    logger.warn(`Ruta: ${req.path} Metodo: ${req.method} no encontrado`);
    next();
  };
  // const middleLoggerError = (req, res, next) => {
  //   logger.error(`Ruta: ${req.path} Metodo: ${req.method} no encontrado`);
  //   next();
  // };
  
  module.exports = { middleLogger, middleLoggerWarm };
  //middleLoggerError