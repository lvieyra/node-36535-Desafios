const sqlite3 = require('./bdsqlite3.js');
// sqlite3.schema.hasTable('mensajes').then(function(exists) {
//     if (!exists) {
//         sqlite3.schema.createTable('mensajes', table => {
//             table.increments('id').primary().notNull(),
//             table.string('usermail',250).notNull(),
//             table.string('mensaje',300).notNull(),
//             table.string('fecha',100)
//     }).then(()=>{console.log('La table fue creada')});
// };
// });
(
    async () => {
        try {
            const exists = await sqlite3.schema.hasTable('mensajes');
        
                if (!exists) {
                    console.log('Se creo la tabla Mensajes');
                  await  sqlite3.schema.createTable('mensajes', table => {
                        table.increments('id').primary().notNull(),
                        table.string('usermail',250).notNull(),
                        table.string('mensaje',300).notNull(),
                        table.string('fecha',100)
                })
            };
           await sqlite3.destroy()
            
        } catch (error) {
            console.log(error);
        }
        
            
    }
)()