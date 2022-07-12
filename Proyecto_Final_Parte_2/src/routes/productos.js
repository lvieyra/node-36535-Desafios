const {Router} = require('express');
const router = Router();

const{getProducto,createProducto,updateProducto,deleteProducto} = require('../controlles/productos.js');

router.get('/:id?', getProducto);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

module.exports = router;