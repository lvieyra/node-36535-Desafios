const { Router } = require("express");
const {validarJWT} = require("../middlewares/validar-jwt.js");
const { 
    carritosCreate, carritosDelete, 
    carritosAddProduct, carritosGetProducts,
    carritosDeleteProduct
} = require("../controllers/carritos");

const router = Router();

router.post("/",validarJWT,carritosCreate);
router.get("/:id",validarJWT,carritosGetProducts);
router.delete("/:id",validarJWT, carritosDelete);
router.post('/:id/productos',validarJWT, carritosAddProduct)
router.delete('/:id/productos/:id_prod', validarJWT,carritosDeleteProduct)

module.exports = router;
