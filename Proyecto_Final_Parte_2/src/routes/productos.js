const {Router} = require('express');
const router = Router();

const{getProducto,createProducto,updateProducto,deleteProducto} = require('../controlles/productos.js');

if(!Administrador){
    router.get('/:id?', getProducto);
}else{
router.get('/:id?', getProducto);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);
}

router.use('*',(req,res)=>{
    res.status(404).json({
        error: -1,
        descripción: req.originalUrl,
        metodo: `${req.method} No autorizado`
    });
});

module.exports = router;