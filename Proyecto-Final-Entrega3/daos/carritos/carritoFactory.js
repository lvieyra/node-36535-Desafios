const config = require ('../../config/config.js');

class CarritoFactory {
  static getPersistence = async () => {
    switch (config.app.persistence) {
      case 'MONGO':
        let CarritoDaoMongo = await require('./carritoDaoMongo.js');
        return new CarritoDaoMongo();
    }
  };
}

module.exports = CarritoFactory;