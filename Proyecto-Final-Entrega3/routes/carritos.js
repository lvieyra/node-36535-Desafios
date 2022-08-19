const { Router } = require("express");

const { 
    carritosCreate, carritosDelete, 
    carritosAddProduct, carritosGetProducts,
    carritosDeleteProduct
} = require("../controllers/carritos");

const router = Router();

router.post("/", carritosCreate);
router.get("/:id",carritosGetProducts);
router.delete("/:id", carritosDelete);
router.post('/:id/productos', carritosAddProduct)
router.delete('/:id/productos/:id_prod', carritosDeleteProduct)

module.exports = router;
