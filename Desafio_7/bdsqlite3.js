const sqlite= require('knex')({
    client:'sqlite3',
    connection:{
        filename:'./data/ecommerce.sqlite'
    },
    useNullAsDefault:true
})

module.exports = sqlite