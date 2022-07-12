
class ContainerMongo {
  constructor(model) {
    this.model = model;
  }
    
  async getAll(){
    
    let producto = await this.model.find()
    
    return producto
  }


  async getById(id){
  

    let producto = await this.model.find({_id : id})
    
    return producto
  }

    async save(data) {
        return await this.model.create(data)
    }

    async update(id,data) {
        return await this.model.findOneAndUpdate({ _id :id }, data )
    }
    async delete(id){
        return await this.model.findOneAndDelete({ _id :id })
    }

   
    async getAllCarritos(){
      let carritos = await this.model.find();
      return carritos
    }
    
    async eliminar(p){}
}

module.exports = ContainerMongo;