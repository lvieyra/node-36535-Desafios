const { json } = require('express');

class Contenedor{
    constructor(){
        this.knex = require('../bd.js');
        this.table = 'productos';
    }


    
    async getAll(){
        try {
            console.log(' entre a productos')
           // const productos = await this.knex(this.table).select();
           console.log(' entre a productos' + JSON.parse(productos));
           // return await this.knex.select('*').table('productos')
           return await knex.select('*').from('productos')
            
            // return await this.knex.from(this.table).select('*')
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