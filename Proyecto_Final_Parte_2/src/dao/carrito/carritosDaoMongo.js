const ContainerMongo = require('../../containers/ContainerMongo')
const carritoModel = require('../../models/carrito')

class CarritoDaoMongoDB extends ContainerMongo {
	constructor(){
		super(carritoModel)
	}

    async saveCarrito(){
        let carrito = {};
        carrito.timestamp = Date.now();
        carrito.productos = [];
        const creado = await this.save(carrito)
        return creado.id
    }
    async deleteCarrito(ids){
        this.delete(ids)
    }
    async listarProductosCarrito(req){
        try {
            const carritos =  await this.getAllCarritos();
            const index = carritos.findIndex(carrito =>  carrito.id == req.params.id);
            if(index != -1){
                return carritos[index]
            }else{
                return index;
            }
    
        } catch (error) {
            console.log(error);
        }
    }

   
async addProductCart(req,res) {
    try {
            const producto = req.body;
            
            const carritos = await this.getAllCarritos();
           
            const index = carritos.findIndex(carrito =>  carrito.id == req.params.id)
            
            
            if(index != -1){
                const productos = carritos[index].productos;
                const ids = productos.map(p => (p.id));
                const proximo =  ids.length === 0 ? 1 : Math.max(...ids) + 1;
                const item = {id:proximo, timestamp:Date.now(), nombre:producto.nombre,descripcion:producto.descripcion,codigo:producto.codigo,foto:producto.foto,precio:producto.precio,stock:producto.stock};
               
                carritos[index].productos.push(item);
               
                this.save(carritos);
                
            }else{
                console.log(`el ${req.params.id} no exite`)
                return index
            }
            
            
    } catch (error) {
        console.log(error);
    }
    }

 async  eliminarUnProductoCarrito(req){
        try {
           
            const carritos = await this.getAllCarritos();
            const index = carritos.findIndex(carrito =>  carrito.id == req.params.id);
            if(index != -1){
                const productos = carritos[index].productos;
                const indice = productos.findIndex(p =>  p.id == req.params.id_prod);
                if (indice != -1){
                    const items = productos.filter(p => p.id != req.params.id_prod);
                    carritos[index].productos = items;
                    
                    this.save(carritos);
                }else{
                    return indice
                }
            }else{
                return index
            }
        } catch (error) {
            console.log('Problema para eliminar un producto del carrito' + error)
        }
    }
    }

module.exports = CarritoDaoMongoDB
