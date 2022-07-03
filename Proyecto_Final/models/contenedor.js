class Contenedor{
    constructor(archivo,fs){
        this.archivo = archivo;
        this.fs = fs;
    }


  //Metodo save
 async save(producto){
    try{
     
        const productos = await this.getAll();
        const ids = productos.map(p => (p.id));
       
        const proximo =  ids.length === 0 ? 1 : Math.max(...ids) + 1;
        const item = {id:proximo, timestamp:Date.now(), nombre:producto.nombre,descripcion:producto.descripcion,codigo:producto.codigo,foto:producto.foto,precio:producto.precio,stock:producto.stock};
    
        productos.push(item)
        this.fs.writeFile(this.archivo,JSON.stringify(productos))
        
    }catch(e){
        console.log(`Problema para escribir  el archivo${e}`)
    }   
}

 // Metodo getById
 async getById(id){
    try{
      const productos = await this.getAll();
      const nodo = productos.find(p => p.id == id)
     
       return nodo??null;
    }catch (error){
      console.log(`El id no fue encontado ${error}`)
    }
}

// Metodo getAll recuperar productos
 async getAll(){
    try{
        const productos =  await this.fs.readFile(this.archivo,'utf8');
        return JSON.parse(productos)
       
    }catch(e){
        return[]
        console.log( `Problema para leer productos ${e}`)
    }
        
    }
  
    // Metodo Actualización
    async actualizarProducto(req){
        try {
            const productos = await this.getAll();
            const index = productos.findIndex(p => p.id == req.params.id);
           
            if(index != -1){
                
                let items= { id:req.params.id, timestamp:Date.now(),nombre:req.body.nombre, descripcion:req.body.descripcion,codigo:req.body.codigo, foto:req.body.foto, precio:req.body.precio, stock:req.body.stock}
                    
                productos[index]= items;
                this.fs.writeFile(this.archivo,JSON.stringify(productos));
            }
            
        } catch (error) {
            console.log(`Error updating producto ${error.message}`)
        }

    }

    // Metodo deleteById
    async deleteById(id){
        try{
            
            const productos = await this.getAll()
            
            const indice = productos.findIndex(p =>  p.id == id)
            
            if(indice!=-1){
                const items = productos.filter(p => p.id != id)
                this.fs.writeFile(this.archivo,JSON.stringify(items))
            }
            
        }catch(e){
            console.log(`El producto no fue encontrado ${e}`)
        }
    };

    // Metodo agregar carrito
    async saveCarrito(carrito){
        try{
     
            const carritos = await this.getAllCarritos();
            const ids = carritos.map(p => (p.id));
           
            const proximo =  ids.length === 0 ? 1 : Math.max(...ids) + 1;
            const item = {id:proximo, timestamp:Date.now(), productos:[]};
            
            carritos.push(item)
            this.fs.writeFile(this.archivo,JSON.stringify(carritos));
            return proximo;
            
        }catch(e){
            console.log(`Problema para escribir  el archivo${e}`)
        }   
    }

    // Metodo getAll recupera datos del carrito 
 async getAllCarritos(){
        try{
            const carritos =  await this.fs.readFile(this.archivo,'utf8');
            return JSON.parse(carritos)
        
        }catch(e){
            return[]
            console.log( `Problema para leer productos ${e}`)
        }
        
    };


//Dar de alta el producto en el carrito
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
            this.fs.writeFile(this.archivo,JSON.stringify(carritos));
            
        }else{
            console.log(`el ${req.params.id} no exite`)
            return index
        }
        
        
} catch (error) {
    console.log(error);
}
}

//Listar productos del carrito
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
        
    }
}
//Eliminar un producto del carrito
async eliminarUnProductoCarrito(req){
    try {
        const carritos = await this.getAllCarritos();
        const index = carritos.findIndex(carrito =>  carrito.id == req.params.id);
        if(index != -1){
            const productos = carritos[index].productos;
            const indice = productos.findIndex(p =>  p.id == req.params.id_prod);
            if (indice != -1){
                const items = productos.filter(p => p.id != req.params.id_prod);
                carritos[index].productos = items;
                this.fs.writeFile(this.archivo,JSON.stringify(carritos));
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
//Elimanar carrito
async deleteCarrito(id){
    try {
        const carritos = await this.getAllCarritos();
        const cart = carritos.filter(item =>
            item.id !=id)
            
            this.fs.writeFile(this.archivo, JSON.stringify(cart))
        
    }catch (e) {
        console.log(`Problema para escribir  el archivo${e}`)
    }
}

}

module.exports = Contenedor