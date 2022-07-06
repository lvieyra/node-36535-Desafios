const knex = require('./bd.js');

knex.schema.hasTable('productos').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('productos', function(table) {
                table.increments('id').primary().notNull(),
                table.string('title').notNull(),
                table.integer('price').notNull(),
                table.string('thumbnail')
      }).then(()=>{console.log('La table fue creada')});
    }
  });
