
const fs = require('fs/promises');
const recipiente = require('../models/contenedor.js');
const contenedor = new recipiente('carritos.txt',fs)

const agregaCarrito = (req,res)=>{
    try{
        contenedor.saveCarrito(req.body).then(val=> res.status(200).json(val));
        

    } catch (error) {
        res.status(409).json({
            mensaje: 'El carrito ya exite ' + error.message
        });
    
    }
};
const eliminaCarrito = (require,response)=>{
    try {
        const ids = require.params.id
        
        contenedor.deleteCarrito(ids)
        response.status(200).json({
            ok: true,
            message: 'El carrito fue eliminado'
        })
    } catch (error) {
        console.log(`Error al eliminar carrito ${error}`)
    }
    
};
const listProductosCarrito = (req,res)=>{
    try {
        contenedor.listarProductosCarrito(req).then(val =>{
            if(val != -1){
                res.status(200).json(val);
            }else{
                res.status(404).json({message:`El id: ${req.params.id} no exite`})
            }})
    } catch (error) {
        
    }
};

const agregarProductoCarrito = (req,res)=>{
    try {
      
        contenedor.addProductCart(req).then( val=> {
            if(val != -1) {
                res.status(200).json({
                    ok: true,
                    message: `El producto fue dado de alta en el carrito ${req.params.id}`
                })
        }else{
            res.status(404).json({message:`El id: ${req.params.id} no exite`})
        }});

        
    } catch (error) {
        console.log(`Error al agregar productos encontado ${error}`)
    }
};
const deleteProductoCarrito = (req,res)=>{
    try {
        contenedor.eliminarUnProductoCarrito(req).then( val=> {
            if(val != -1) {
                res.status(200).json({
                    ok: true,
                    message:  `El producto fue eliminado del carrito ${req.params.id}`
            })}else{
                res.status(404).json({message:`El id: ${req.params.id} del carrito no exite o id: ${req.params.id_prod} del producto no exite`})
            }
        })
    } catch (error) {
        console.log(`Error al eliminar productos  ${error}`)
    }
};

module.exports = {agregaCarrito,eliminaCarrito,listProductosCarrito,agregarProductoCarrito,deleteProductoCarrito}