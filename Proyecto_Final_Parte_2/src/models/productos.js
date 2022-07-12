const mongoose = require('mongoose')

const UsuarioSchema = new mongoose.Schema({
	 nombre: { type: String, max: 100 },
	 descripcion: { type: String},
	 codigo: { type: Number },
     foto: { type: String, max: 100 },
     precio: { type: Number},
     stock: { type: Number}
})

const productos = mongoose.model('productos', UsuarioSchema)

module.exports = productos