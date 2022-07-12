const ContainerMongo = require('../../containers/ContainerMongo')
const productoModel = require('../../models/productos')

class ProductoDaoMongo extends ContainerMongo {
	constructor(){
		super(productoModel)
	}

	saveProducto(producto){
		
		this.save(producto)	
		return producto
	}

	getAllProductos(){
		return this.getAll()
	}

	getByIdProducto(id){
	return	this.getById(id)
	}

	actualizacionProducto(id, producto){
		
		this.update(id, producto)
	}
	deleteById(id){
		this.delete(id)
	}
}
	module.exports = ProductoDaoMongo



