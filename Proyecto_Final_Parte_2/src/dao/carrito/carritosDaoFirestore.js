const {ContainerFirestore} = require('../../containers/containerFirestore')

class CarritoDaoFirestore extends ContainerFirestore {
	constructor(){
		super('carritos')
        
	}
   

    async saveCarrito(){
        let carrito = {};
        carrito.timestamp = Date.now();
        carrito.productos = [];
        const creado = await this.save(carrito)
       
        return creado.id
    }

    async deleteCarrito(cartId){
        try {
            
                const carritos =  await this.getAll();
               
                const index = carritos.findIndex(carrito =>  carrito.id == cartId);
                
            if(index != -1){
                this.delete(cartId);
                return index
            }else{
                return index
            }
            
            
        } catch (error) {
            console.log(error)
        }
        
    }


    async listarProductosCarrito(req){
        try {
            const carritos =  await this.getAll();
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
            
            const carritos = await this.getAll();
            
           
            const index = carritos.findIndex(carrito =>  carrito.id == req.params.id)
           
            if(index != -1){
                console.log(carritos[index].data.productos)
                const productos = carritos[index].data.productos;
                const ids = productos.map(p => (p.id));
                const proximo =  ids.length === 0 ? 1 : Math.max(...ids) + 1;
                const item = {id:proximo, timestamp:Date.now(), nombre:producto.nombre,descripcion:producto.descripcion,codigo:producto.codigo,foto:producto.foto,precio:producto.precio,stock:producto.stock};
               
                productos.push(item);
               
               
              await  this.update(carritos[index].data,req.params.id);
                
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
           
            const carritos = await this.getAll();
            const index = carritos.findIndex(carrito =>  carrito.id == req.params.id);
            
            if(index != -1){
                const productos = carritos[index].data.productos;
                const indice = productos.findIndex(p =>  p.id == req.params.id_prod);
                
                if (indice != -1){
                    const items = productos.filter(p => p.id != req.params.id_prod);
                    carritos[index].data.productos = items;
                    console.log(carritos[index].data.productos)
                    await  this.update(carritos[index].data,req.params.id);
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

module.exports = CarritoDaoFirestore
