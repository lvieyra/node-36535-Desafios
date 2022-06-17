
// const{Router} = require('express');
// const router = Router();
const router = require('express').Router();
const productos = require('../controllers/productosController')
router.get('/', productos.listasProductos);
// router.get('/', (req,res)=>{
//     res.json({
//         "ruta": "estoy en endpoint de router get"
//     });
// });
router.get('/:id', productos.itemId);
// router.get('/:id', (req,res)=>{
//     let id = req.params.id
//     console.log(`Parametro ${id}`);
//         res.json({
//             "ruta": `Parametro ${req.params.id}`
//         });
//     });

router.post('/', (req, res)=>{});
router.put('/', (req, res)=>{});
router.delete('/', (req, res)=>{});
module.exports = router;