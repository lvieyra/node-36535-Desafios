

class Contenedor{
    constructor(){
        this.knex = require('../bd.js');
        this.table = 'productos';
    }


    
    async getAll(){
        try {
            
          return  this.knex(this.table).select('*');
          
        } catch (error) {
            console.log('Problema para seleccionar productos')
        }
        
     }

     async save(producto) {
        try {
            await this.knex(this.table).insert(producto);
        } 
        catch(error) {
            return `Se produjo un error: "${error}"`;
        }
    }


}

module.exports = Contenedor