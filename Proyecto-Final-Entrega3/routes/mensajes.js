const express = require('express');
const router = express.Router();
const {
    sendAlta,
    sendCart
} = require('../models/email.js');
const {
    validarJWT,
  } = require("../middlewares.validar-jwt.js");

//router.post('/',validarJWT, msgController.createMensaje);
router.get('/senders',validarJWT, twilio);
router.get('/:email',validarJWT, sendAlta);



module.exports = router;