
class Contenedor{
    constructor(){
        this.knex = require('../bdsqlite3.js');
        this.table = 'mensajes';
    }

    async getAll() {
        try {
            return await this.knex(this.table).select('*');
        }
        catch(error) {
            return `Se produjo un error: "${error}"`;
        }
    }
    async save(mensaje) {
        try {
            await this.knex(this.table).insert(mensaje);
        } 
        catch(error) {
            return `Se produjo un error: "${error}"`;
        }
    }
}

module.exports = Contenedor;