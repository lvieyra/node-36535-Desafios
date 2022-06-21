const { Router } = require("express");
const productos = require("../controllers/productosController");
const router = Router();
router.post('/', productos.agregarProducto);
module.exports = router;
