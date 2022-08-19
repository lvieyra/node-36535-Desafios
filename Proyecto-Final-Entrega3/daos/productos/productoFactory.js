const config = require ('../../config/config.js');

class ProductoFactory {
  static getPersistence = async () => {
    switch (config.app.persistence) {
      case 'MONGO':
        let ProductoDaoMongo = await require('./productoDaoMongo.js');
        return new ProductoDaoMongo();
    }
  };
}

module.exports = ProductoFactory;