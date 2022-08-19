const logger = require("../helpers/winston-helper");

const loguearPeticiones = (req, res, next) => {
  logger.log("info", `Petición recibida: ${req.method} - ${req.path}`);
  next();
};

const loguearRutaNoImplementada = (req, res, next) => {
  logger.log(
    "warn",
    `Operación: ${req.method} en ruta ${req.path} no implementada`
  );
  res.status(404).json({
    error: -2,
    msg: `Operación: ${req.method} en ruta ${req.originalUrl} no implementada`,
  });
};

module.exports = { loguearPeticiones, loguearRutaNoImplementada };
