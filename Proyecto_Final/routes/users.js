const express = require('express');
const router = express.Router();


const fs = require('fs');
const { getProducto } = require('../controlles/admin.js');
fs.readdirSync(__dirname).filter((file)=>{
const fileName = file.split('.').shift();
const spik= ['users'].includes(fileName);


router.use('/carrito', require('./carrito.js'));
router.use('/carrito/*',(req,res)=>{
    res.status(404).json({
        error: -2,
        descripción: req.originalUrl,
        metodo: `${req.method} No autorizado`
    });
});


if(!spik && Administrador){
    router.use('/productos',require('./admin.js'));
}else{ 
    router.get('/productos/:id?',function(req,res,next){
        if(req.originalUrl == `/api/productos/${req.params.id}`){
            next();
           
        }else if(req.originalUrl != `/api/productos`){
            res.status(404).json({
                error: -1,
                descripción: req.originalUrl,
                metodo: `${req.method} No autorizado`
    })}else next();
    }, getProducto);
    router.put('*',(req,res)=>{
        res.status(404).json({
            error: -1,
            descripción: req.originalUrl,
            metodo: `${req.method} No autorizado`
        });
    });
    router.post('*',(req,res)=>{
        res.status(404).json({
            error: -1,
            descripción: req.originalUrl,
            metodo: `${req.method} No autorizado`
        });
    });
    router.delete('*',(req,res)=>{
        res.status(404).json({
            error: -1,
            descripción: req.originalUrl,
            metodo: `${req.method} No autorizado`
        });
    });
}
router.use('*',(req,res)=>{
    res.status(404).json({
        error: -1,
        descripción: req.originalUrl,
        metodo: `${req.method} No autorizado`
    });
});
});


module.exports = router;