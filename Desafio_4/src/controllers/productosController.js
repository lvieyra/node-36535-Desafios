let productos = require('../models/modelProductos');


function listasProductos(req,res){
    try {
            res.status(200).json(productos)
        
    } catch (error) {
        res.status(404).json({
            mensaje: 'Hubo un error: ' + error.message
        })
    }

}
function itemId(req, res){
    try {
        const id = parseInt(req.params.id);
        console.log(id);
        const index = productos.findIndex(producto => producto.id == id);
        console.log(index)
        if(index !== -1){
            res.status(200).json({
                ok: true,
                producto: productos[index]
            })
        // }else{
        //     res.status(404).send(`El producto ${id} no fue encontrado`)
          }
    
    } catch (error) {
        res.status(404).json({
            mensaje: 'El producto no exite ' + error.message
        });
    }
 
}
function agregarProducto(req, res){
    try {
         let id = 1;
         if(productos.length !==0){
            id = parseInt(productos[productos.length-1].id) + 1;
         }
    
         const producto = {
            id : id.toString(),
            nombre:req.body.nombre,
            marca:req.body.marca,
            precio:req.body.precio,
            stock:req.body.stock,
            img:req.body.img
        } 
         
         productos.push(producto);
         res.status(201).json(producto);
        
    } catch (error) {
        res.status(409).json({
            mensaje: 'El producto ya exite ' + error.message
        });
    }
   
}
function actualizarProducto(req, res){}
function bajaProducto(req, res){
   try {
         const id = parseInt(req.params.id);
         console.log(id);
        const index = productos.findIndex(producto => producto.id== id)
        console.log(index)
        if(index != -1){
            productos = productos.filter(producto => producto.id != id);
            res.status(200).json({
                ok:true,
                message:`El producto ${id} ha sido eliminado`
            })
        
        res.status(200).json(productos)
        }
    } catch (error) {
        res.status(404).json({
            mensaje: 'El producto no exite ' + error.message
        });
    }
    

}
module.exports = {
    listasProductos,
    itemId,
    bajaProducto,
    agregarProducto,
    actualizarProducto
}