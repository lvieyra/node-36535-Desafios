import config from '../config/config.js';

export default class PersistenceFactory {
  static getPersistence = async () => {
    switch (config.app.persistence) {
      case 'ARRAY':
        let { default: usersDaoArray } = await import('../daos/usersDaoArray.js');
        return new usersDaoArray();
      case 'DB':
        let { default: usersDaoDB } = await import('../daos/usersDaoDB.js');
        return new usersDaoDB();
    }
  };
}
