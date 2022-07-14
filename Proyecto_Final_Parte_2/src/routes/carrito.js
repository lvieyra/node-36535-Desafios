const express = require('express');
const router = express.Router();
const {agregaCarrito,eliminaCarrito,listProductosCarrito,agregarProductoCarrito,deleteProductoCarrito} = require('../controlles/carrito.js')

router.post('/', agregaCarrito);
router.delete('/:id',eliminaCarrito);
router.get('/:id/productos',listProductosCarrito);
router.post('/:id/productos', agregarProductoCarrito) ;
router.delete('/:id/productos/:id_prod', deleteProductoCarrito);
router.use('*',(req,res)=>{
    res.status(404).json({
        error: -2,
        descripción: req.originalUrl,
        metodo: `${req.method} No autorizado`
    });
});


module.exports = router;