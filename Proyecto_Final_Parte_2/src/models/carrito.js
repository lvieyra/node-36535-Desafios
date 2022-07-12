const mongoose = require('mongoose')

const CarritoSchema = new mongoose.Schema({
	timestamp:{
        type: Number,
    },
	productos: []
	}
)

const carrito = mongoose.model('carrito', CarritoSchema)

module.exports = carrito