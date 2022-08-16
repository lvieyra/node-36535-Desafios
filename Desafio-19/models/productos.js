const mongoose = require('mongoose')

const {Schema,model} = mongoose

ProductoSchema = new Schema({
    nombre:{ type: String},
    descripcion: {type:String},
    precio: {type:Number}
})

module.exports = model('Producto',ProductoSchema)