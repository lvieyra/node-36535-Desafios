const ProductoService = require('../services/productos.js');
const productoService = new ProductoService();

const productosGet = async(req, res) => {
    const id = req.params.id || null;
    const resultado = await productoService.productosGet(id);
    if (resultado.error) {
        res.status(400).json({error:resultado.error})
    }
    
    res.status(200).json(resultado.productos);
}

const productosCreate = async(req, res) => {
    const producto = req.body;
    const resultado = await productoService.productosCreate(producto);
    if (resultado.error) {
        res.status(400).json({error:resultado.error})
    }
    
    res.status(201).json(resultado.producto);
}

const productosUpdate = async(req, res) => {
    const id = req.params.id || null;
    const producto = req.body;
    const resultado = await productoService.productosUpdate(id, producto);
    if (resultado.error) {
        res.status(400).json({error:resultado.error})
    }
    
    res.status(200).json(resultado.producto);
}

const productosDelete = async(req, res) => {
    const id = req.params.id || null;
    const resultado = await productoService.productosDelete(id);
    if (resultado.error) {
        res.status(400).json({error:resultado.error})
    }
    
    res.status(200).json(resultado.producto);
}

module.exports = {
    productosGet,
    productosCreate,
    productosUpdate,
    productosDelete,
}