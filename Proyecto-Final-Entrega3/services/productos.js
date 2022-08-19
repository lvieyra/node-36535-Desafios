const ProductoFactory = require('../daos/productos/productoFactory.js');   

class ProductoService {
    constructor() {
        this.productosDao;
        this.init();
    }

    init = async () => {
        this.productosDao = await ProductoFactory.getPersistence();
    };

    productosGet = async ( id ) => {
        if (id !== null){
            const producto = await this.productosDao.getById(id);
            if (producto !== null){
                return {producto}
            } else {
                const error = `El producto ${id} no se ha encontrado`;
                return { error }
            }
        } else {
            const productos = await this.productosDao.getAll();  
            return { productos }      
        }
    }
    productosCreate = async ( newProduct ) => {
        if (newProduct !== null){
            const producto = await this.productosDao.save(newProduct);
            if (producto !== null){
                return {producto}
            } else {
                const error = `El producto no pudo ser creado`;
                return { error }
            }
        }
    }
    productosUpdate = async ( id, updateProduct ) => {
        if (id !== null && updateProduct !== null) {
            const producto = await this.productosDao.update(id, updateProduct);
            if (producto !== null){
                return {producto}
            } else {
                const error = `El producto no pudo ser actualizado`;
                return { error }
            }
        }
    }
    productosDelete = async ( id) => {
        if (id !== null) {
            const producto = await this.productosDao.delete(id);
            if (producto !== null){
                return {producto}
            } else {
                const error = `El producto no pudo ser eliminado`;
                return { error }
            }
        }
    }
    
}

module.exports = ProductoService;