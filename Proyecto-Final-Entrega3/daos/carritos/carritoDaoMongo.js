const contenedorMongo = require('../../contenedores/contenedorMongo.js');
const Carrito = require('../../models/carrito.js');

class CarritoDaoMongo extends contenedorMongo {
  constructor() {
    super(Carrito);
  }

  get = async (id) => {
    const carrito = await this.getById(id);
    return carrito;
  }

  addProduct = async (carrito, producto) => {
    const indexProduct = carrito.productos.findIndex(x => (x.producto.valueOf() === producto.id));

    if (indexProduct < 0){
      carrito.productos.push({
          producto:producto,
          cantidad:1
      });
  } else {
      carrito.productos[indexProduct].cantidad += 1;
  }

  const carritoUpdated = await this.update(carrito._id, carrito);
  return carritoUpdated;
  }

  deleteProduct = async (idCart, idProducto) => {
    const carrito = await this.getById(idCart);
    const indexProduct = carrito.productos.findIndex(x => (x.producto.valueOf() === idProducto));
    if (indexProduct > -1){
      if (carrito.productos[indexProduct].cantidad === 1){
        carrito.productos.splice(indexProduct,1);
      } else {
        carrito.productos[indexProduct].cantidad -= 1;
      } 
    }
    const carritoUpdated = await this.update(carrito._id, carrito);
    return carritoUpdated;
  }
}

module.exports = CarritoDaoMongo;
