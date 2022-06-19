
// const{Router} = require('express');
// const router = Router();
const router = require('express').Router();
const productos = require('../controllers/productosController')
router.get('/', productos.listasProductos)
      .get('/:id', productos.itemId)
      .post('/', productos.agregarProducto)
      .put('/', (req, res)=>{})
      .delete('/:id', productos.bajaProducto)
module.exports = router;