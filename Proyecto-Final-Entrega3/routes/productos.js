const { Router } = require("express");
const{upload} = require("../middlewares/multer-file.js")
const { productosGet, productosCreate, productosUpdate, productosDelete } = require("../controllers/productos");
const{
    validarJWT,
    
} = require("../middlewares");

const router = Router();

router.get("/:id?",validarJWT,productosGet);
router.post("/",validarJWT, upload.single('imagen'), productosCreate);
router.put("/:id",validarJWT,upload.single('imagen'),productosUpdate);
router.delete("/:id",validarJWT,productosDelete);

module.exports = router;
