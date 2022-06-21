
const{Router} = require('express');
const router = Router();
const productos = require('../controllers/productosController')
router.get('/', productos.listasProductos)
      .get('/:id', productos.itemId)
      .post('/', productos.agregarProducto)
      .put('/:id', productos.actualizarProducto)
      .delete('/:id', productos.bajaProducto)
module.exports = router;