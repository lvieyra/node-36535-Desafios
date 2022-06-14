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
            const item = {id:proximo,title:producto.title,price:producto.price,thumbnail:producto.thumbnail}
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
            const nodo = productos.find(p => p.id === id)
             return nodo??null;
          }catch (error){
            console.log(`El id no fue encontado ${error}`)
          }
    }

    // Metodo getAll 
   async getAll(){
    try{
        const productos = await this.fs.readFile(this.archivo,'utf8');
        return JSON.parse(productos)
    }catch(e){
        return []
        console.log( `Problema para leer productos ${e}`)
    }
        
    }

    // Metodo deleteById
    async deleteById(id){
        try{
            const productos = await this.getAll()
            const indice = productos.findIndex(p => {return p.id === id})
            if(indice!=-1){
                const items = productos.filter((p) => p.id !== id)
                console.log(items)
                this.fs.writeFile(this.archivo,JSON.stringify(items))
            }
            
        }catch(e){
            console.log(`El producto no fue encontrado ${e}`)
        }
    }

    // Metodo deleteAll
   async  deleteAll(){
        try{
            this.fs.writeFile(this.archivo,[])
        }catch(e){
            console.log(`Hubo un error: ${e}`)
        }   
    }
}
module.exports = Contenedor