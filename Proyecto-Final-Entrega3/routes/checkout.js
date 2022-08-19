const { Router } = require("express");

const { carritoCheckout } = require("../controllers/carritos");

const router = Router();

router.get("/:id_carrito", carritoCheckout);

module.exports = router;
