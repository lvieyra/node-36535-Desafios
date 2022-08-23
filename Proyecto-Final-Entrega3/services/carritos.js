const CarritoFactory = require('../daos/carritos/carritoFactory.js');   
const ProductoService = require('../services/productos.js');
const productoService = new ProductoService();

class CarritoService {
    constructor() {
        this.carritosDao;
        this.init();
    }

    init = async () => {
        this.carritosDao = await CarritoFactory.getPersistence();
    };

    carritosGet = async (id) => {
        const cart = await this.carritosDao.get(id);
        if(!cart){
            const error = `No existe el carrito solicitado`;
            return { error };
        }

        if(!cart.productos.length){
            const error = `No se puede realizar el checkout: no hay productos cargados en el carrito`;
            return { error }
        }
        return { mensaje: `Checkout realizado con éxito`, orden: {
            cliente: cart.email,
            productos: cart.productos
        }};
    }

    carritosCreate = async (cart) => {
        const newCart = await this.carritosDao.save(cart);
        return newCart;
    }

    carritosDelete = async ( id) => {
        if (id !== null) {
            const carrito = await this.carritosDao.delete(id);
            if (carrito !== null){
                return {carrito}
            } else {
                const error = `El carrito no pudo ser eliminado`;
                return { error }
            }
        }
    }

    carritosAddProduct = async (idCart, idProduct) => {
        if (idCart !== null && idProduct !== null) {
            const carrito = await this.carritosDao.getById(idCart);
            const { producto } = await productoService.productosGet(idProduct);
            const result = await this.carritosDao.addProduct(carrito, producto);
            return {mensaje: `Se agregó el producto ${idProduct} al carrito ${idCart}`}
        } else {
            const error = `No se pudo agregar el producto`;
            return { error }
        }
    }

    carritosGetProducts = async (idCart) => {
        const productosCarrito = [];
        if (idCart !== null) {
            const carrito = await this.carritosDao.getById(idCart);
            if (carrito) {
                for(const prod of carrito.productos) {
                    const  {producto : productoCarrito}  = await productoService.productosGet(prod.producto.valueOf());
                    const producto = productoCarrito.toObject();
                    producto.cantidad = prod.cantidad
                    productosCarrito.push(producto);
                };
            }
            
            
        }

        return productosCarrito;
    }


    carritosDeleteProduct = async (idCart, idProduct) => {
        if (idCart !== null && idProduct !== null) {
            const carrito = await this.carritosDao.deleteProduct(idCart, idProduct);
            return carrito;
        }

        return {error:`Debe completar todos los campos`};
    }


}

module.exports = CarritoService;