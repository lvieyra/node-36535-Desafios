const express = require('express');
const router = express.Router();
const {agregaCarrito,eliminaCarrito,listProductosCarrito,agregarProductoCarrito,deleteProductoCarrito} = require('../controlles/carrito.js')

router.post('/', agregaCarrito);
router.delete('/:id', eliminaCarrito);
router.get('/:id/productos',listProductosCarrito);
router.post('/:id/productos', agregarProductoCarrito) ;
router.delete('/:id/productos/:id_prod', deleteProductoCarrito);



module.exports = router;