const knex = require('knex')({
        client: 'mysql',
        connection : {
            host: 'localhost',
            port: 8111,
            user: 'root',
            password: '',
            database: 'ecommerce'
        },
        pool: {min:1, max:10}
    });

    
    module.exports = knex