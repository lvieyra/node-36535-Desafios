const { Router } = require("express");

const { productosGet, productosCreate, productosUpdate, productosDelete } = require("../controllers/productos");

const router = Router();

router.get("/:id?",productosGet);
router.post("/",productosCreate);
router.put("/:id",productosUpdate);
router.delete("/:id",productosDelete);

module.exports = router;
