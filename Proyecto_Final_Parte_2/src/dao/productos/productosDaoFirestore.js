const {ContainerFirestore} = require('../../containers/containerFirestore')
class ProductoDaoFirestore extends ContainerFirestore {
  constructor(){
    super('productos')
    
  }

  getAllProductos(){
    return this.getAll()
  }

  getByIdProducto(id){
    return	this.getById(id)
  }


  saveProducto(producto){
    if(producto){
      
      this.save(producto)
      return producto
    } else {
      return 'Not saved'
    }
  }

  actualizacionProducto(producto, id){
    if(producto) {
        
      this.update(producto, id)
      return producto
    } else {
      return 'Not updated'
    }
  }
  deleteById(id){
    this.delete(id)
  }
}

module.exports = ProductoDaoFirestore

