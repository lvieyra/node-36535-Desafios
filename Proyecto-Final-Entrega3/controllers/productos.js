const ProductoService = require('../services/productos.js');
const productoService = new ProductoService();
const Producto = require('../models/producto.js');

const productosGet = async(req, res) => {
    try {
        const id = req.params.id || null;
        const resultado = await productoService.productosGet(id);
    if (resultado.error) {
        res.status(400).json({error:resultado.error})
    }
    
        res.status(200).json(resultado);
    } catch (error) {
        logger.log("error", `Hubo un error en el login: ${error}`);
        console.log(error.message)
    }
    
}

const productosCreate = async(req, res) => {

    try {
        const {nombre,descripcion, codigo,precio,stock} = req.body;

        const producto = new Producto({ nombre, descripcion, codigo,imagen: `/files/${req.file.filename}`,precio,stock });
        const resultado = await productoService.productosCreate(producto);
    if (resultado.error) {
        res.status(400).json({error:resultado.error})
    }
    
    res.status(201).json(resultado);
    } catch (error) {
        logger.log("error", `Hubo un error en el login: ${error}`);
        console.log(error.message)
    }
    
}

const productosUpdate = async(req, res) => {

    try {
        const id = req.params.id || null;
        const{...resto} = req.body;
        resto.imagen = `/files/${req.file.filename}`
        const resultado = await productoService.productosUpdate(id, resto);
        if (resultado.error) {
            res.status(400).json({error:resultado.error})
        }
    
        res.status(200).json(resultado.producto);
    } catch (error) {
        logger.log("error", `Hubo un error en el login: ${error}`);
        console.log(error.message)
    }
    
}

const productosDelete = async(req, res) => {

    try {
        const id = req.params.id || null;
        const resultado = await productoService.productosDelete(id);
    if (resultado.error) {
        res.status(400).json({error:resultado.error})
    }
    
       res.status(200).json(resultado.producto);
    } catch (error) {
        logger.log("error", `Hubo un error en el login: ${error}`);
        console.log(error.message)
    }
    
}

module.exports = {
    productosGet,
    productosCreate,
    productosUpdate,
    productosDelete,
}