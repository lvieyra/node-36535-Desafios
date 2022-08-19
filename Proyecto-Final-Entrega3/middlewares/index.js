const validarCampos = require("../middlewares/validar-campos");
const validarJwt = require("../middlewares/validar-jwt");
const validarRoles = require("../middlewares/validar-roles");
const loguearPeticiones = require("../middlewares/loguear-peticiones");

module.exports = {
  ...validarCampos,
  ...validarJwt,
  ...validarRoles,
  ...loguearPeticiones,
};
