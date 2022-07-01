const express = require('express');
const router = express.Router();
const{getProducto,createProducto,updateProducto,deleteProducto} = require('../controlles/admin.js');

router.get('/:id?', getProducto);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

module.exports = router;