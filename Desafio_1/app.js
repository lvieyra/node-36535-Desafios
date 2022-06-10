class Usuario{
    constructor(nombre,apellido,libros,mascotas){
      this.nombre = nombre;
      this.apellido =apellido;
      this.libros = libros;
      this.mascotas = mascotas;
    }
    
    getFullName(){
        return ` ${this.nombre} ${this.apellido}`
    }

    addMascotas(mascota){
       this.mascotas.push(mascota)
         this.mascotas
    }
   
    countMascotas()
    {
        return this.mascotas.length
    }
    addBook(nombre,autor){
        this.libros.push({nombre:nombre,autor:autor}) 
    } 

    getBookNames(){
        const nombres = []
        this.libros.forEach((item)=>{
            nombres.push(item.nombre)
        })
        return nombres
    }
}

const usuario = new Usuario('Lorenzo','Vieyra',[],[])
console.log(usuario.getFullName())
console.log(usuario.addMascotas('cody'))
console.log(usuario.countMascotas())
console.log(usuario.addBook('Digo el Llamado','Antonio E. Aguero'))
console.log(usuario.getBookNames())