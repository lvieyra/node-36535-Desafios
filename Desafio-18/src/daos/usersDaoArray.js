export default class UserDaoArray {
  constructor() {
    this.users = [];
  }
  getAll = async () => {
    try {
      return this.users;
    } catch (error) {
      console.log(error);
    }
  };

  save = async (user) => {
    try {
      if (this.users.length === 0) user.id = 1;
    else user.id = this.users[this.users.length - 1].id + 1;
    this.users.push(user);
    return user;
    } catch (error) {
      console.log(error);
    }
  };

  update = async (id, user) => {
   try {
    const{nombre,apellido,empresa, puesto}=user;
    const index = await this.users.findIndex(p => p.id == id);
    if(index != -1){
      console.log(index)
      let items = {id, nombre,apellido,empresa, puesto};
      
      this.users[index] = items
      return this.users[index];
    }
   } catch (error) {
    console.log(error);
   }
  }

  delete = async(user) => {
      try {
        const indice = await this.users.findIndex(p =>  p.id == user)
    
    if(indice!=-1){
       this.users = this.users.filter(p => p.id != user)
        return this.users
   
    }
    } catch (error) {
      console.log(error);
    }
    
  }
}
