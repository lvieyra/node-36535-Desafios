import PersistenceFactory from '../daos/persistenceFactory.js';

export default class UsersService {
  constructor() {
    
    this.usersDao;
    this.init();
  }
  init = async () => {
    this.usersDao = await PersistenceFactory.getPersistence();
  };
  getUsers = async () => {
    return await this.usersDao.getAll();
  };
  getByIdUser = async (id) => {
    return await this.usersDao.getById(id);
  };
  addUser = async (user) => {
    return await this.usersDao.save(user);
  };
  updateUser = async (id,user) => {
    return await this.usersDao.update(id,user);
  };
  deleteUser = async (user) => {
    return await this.usersDao.delete(user);
  };
}
