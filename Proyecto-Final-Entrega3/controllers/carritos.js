const CarritoService = require('../services/carritos.js');
const carritoService = new CarritoService();
const {
    sendCart,
} = require('../controllers/notificaciones');

const productosGet = async(req, res) => {
    const id = req.params.id || null;
    const resultado = await productoService.productosGet(id);
    if (resultado.error) {
        res.status(400).json({error:resultado.error})
    }
    
    res.status(200).json(resultado.productos);
}

const carritosCreate = async(req, res) => {
    const carrito = req.body;
    const resultado = await carritoService.carritosCreate(carrito);
    if (resultado.error) {
        res.status(400).json({error:resultado.error})
    }
    
    res.status(201).json(resultado);
}

const carritosDelete = async(req, res) => {
    const id = req.params.id || null;
    const resultado = await carritoService.carritosDelete(id);
    if (resultado.error) {
        res.status(400).json({error:resultado.error})
    }
    
    res.status(200).json(resultado.carrito);
}

const carritosAddProduct = async(req, res) => {
    const idCart = req.params.id || null;
    const idProduct = req.body.id;
    const resultado = await carritoService.carritosAddProduct(idCart, idProduct);
    if (resultado.error) {
        res.status(400).json({error:resultado.error})
    }
    res.status(200).json(resultado);
}

const carritosGetProducts = async(req, res) => {
    const idCart = req.params.id || null;

    const resultado = await carritoService.carritosGetProducts(idCart);
    if (resultado.error) {
        res.status(400).json({error:resultado.error})
    }

    res.status(200).json(resultado);
}

const carritosDeleteProduct = async(req, res) => {
    const idCart = req.params.id || null;
    const idProduct = req.params.id_prod || null;

    const resultado = await carritoService.carritosDeleteProduct(idCart, idProduct);
    if (resultado.error) {
        res.status(400).json({error:resultado.error})
    }

    res.status(200).json(resultado);
}

const carritoCheckout = async (req, res) => {
  const idCart = req.params.id_carrito || null;
  const resultado = await carritoService.carritosGet(idCart);
  if (resultado.error) {
    return res.status(400).json({ error: resultado.error });
  }
  //Aca se puede mandar el mail con el checkout
  await sendCart(resultado.email, resultado.productos);
  //Luego del checkout se borra el carrito
  await carritoService.carritosDelete(idCart);
  res.status(200).json(resultado);
};


module.exports = {
    //carritosGet,
    carritosCreate,
    carritosDelete,
    carritosAddProduct,
    carritosGetProducts,
    carritosDeleteProduct,
    carritoCheckout
}