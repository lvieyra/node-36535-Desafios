const contenedorMongo = require('../../contenedores/contenedorMongo.js');
const Producto = require('../../models/producto.js');

class ProductoDaoMongo extends contenedorMongo {
  constructor() {
    super(Producto);
  }
}

module.exports = ProductoDaoMongo;