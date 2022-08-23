const express = require('express');
const router = express.Router();




const {validarJWT} = require("../middlewares/validar-jwt.js");


router.post('/:idCart',validarJWT, createOrder);
router.get('/email/:email',validarJWT, getOrdersByEmail);


module.exports = router