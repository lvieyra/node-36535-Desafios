const listasproductos = require('../models/modelProductos')
function listasProductos(req,res){
    try {
        res.status(200).json(listasproductos)
    } catch (error) {
        res.status(404).json({
            mensaje: 'Hubo un error: ' + error.message
        })
    }

}
function itemId(req, res){
    try {
        res.status(200).json(listasproductos.find(producto => producto.id == req.params.id));
        
    } catch (error) {
        res.status(404).json({
            mensaje: 'El producto no exite ' + error.message
        });
    }
}
function bajaProducto(req, res){
    try {
        const productos = listasproductos.filter(producto => producto.id !== req.params.id);
        res.status(200).json(productos);
    } catch (error) {
        res.status(404).json({
            mensaje: 'El producto no exite ' + error.message
        });
    }
    

}
module.exports = {
    listasProductos,
    itemId,
    bajaProducto
}