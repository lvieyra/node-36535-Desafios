class Contenedor{
    constructor(archivo,fs){
        this.archivo = archivo;
        this.fs = fs;
    }


  //Metodo save
 async save(producto){
    try{
        console.log(`entre save ${producto.nombre}`);
        const productos = await this.getAll();
        
        console.log(`return get${productos}`)
        const ids = productos.map(p => (p.id));
       
        const proximo =  ids.length === 0 ? 1 : Math.max(...ids) + 1;
        const item = {id:proximo, timestamp:Date.now(), nombre:producto.nombre,descripcion:producto.descripcion,codigo:producto.codigo,foto:producto.foto,precio:producto.precio,stock:producto.stock};
        console.log(`antes de print ${item}`)
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

// Metodo getAll 
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
            console.log(index)
            if(index != -1){
                console.log(req.body)
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
    }


}

module.exports = Contenedor