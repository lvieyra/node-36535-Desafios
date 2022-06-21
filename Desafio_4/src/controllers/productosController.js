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
        const index = productos.findIndex(producto => producto.id == id);
        if(index !== -1){
            res.status(200).json({
                ok: true,
                producto: productos[index]
            })
        }else{
            res.status(404).send(`El producto ${id} no fue encontrado`)
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
            title : req.body.title,
            price : req.body.price,
            thumbnail : req.body.thumbnail
        } 
         
         productos.push(producto);
         res.status(201).json(producto);
        
    } catch (error) {
        res.status(409).json({
            mensaje: 'El producto ya exite ' + error.message
        });
    }
   
}
function actualizarProducto(req, res){
    if (Object.keys(req.body).length !== 0){
        const id = parseInt(req.params.id);
        const producto = productos.find(p => p.id == id);
        const indice = productos.findIndex(p => p.id == id);
       
        if (indice != -1){
            producto.title = req.body.title;
            producto.price = req.body.price; 
            producto.thumbnail = req.body.thumbnail;
            productos[indice] = producto;
            res.status(200).json({
                ok: true,
                producto_actualizado: producto
            })
    
        }else{
            res.status(404).send({
                message: `El producto ${id} no exite`
            })
        }
       
    }else{
        res.status(204).send({
            message: 'El producto esta sin contenido'
        })
    }
    
}
function bajaProducto(req, res){
   try {
         const id = parseInt(req.params.id);
        const index = productos.findIndex(producto => producto.id== id)
        console.log(index)
        if(index != -1){
            productos = productos.filter(producto => producto.id != id);
            res.status(200).json({
                ok:true,
                message:`El producto ${id} ha sido eliminado`
            })
        
             res.status(200).json(productos)
        }else{
            res.status(404).send({
                message: `El producto ${id} no exite`
            })
        }
     }catch (error) {
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