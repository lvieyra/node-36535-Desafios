const { normalize, denormalize, schema } = require('normalizr');

class Normalizer {

    getDataNormalized(data_to_normalize) {
        const messages = JSON.parse(JSON.stringify(data_to_normalize));
        const authorSchema = new schema.Entity('authors')
        const messageSchema = new schema.Entity('mensajes', {
          author: authorSchema,
        },{idAttribute:'_id'})
        const global = new schema.Entity('global', {
          messages: [messageSchema],
        })

        const data = { id: 'mensajes', messages }

        const dataNormalized = normalize(data, global)
        return dataNormalized;
    }
}

module.exports = Normalizer