const mongoose = require('mongoose')

const OrdenSchema = new mongoose.Schema({
    timestamp:{
        type: Number,
        required: false,
    },
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
    },
    direccion:{
        type: String,
        required: [true, 'La dirección de entrega es obligatoria'],
    },
    estado:{
        type: String,
        default: 'generada'
    },
    numero:{
        type: Number,
        required: false,
    },
    productos : []
});

// Función que calcula el numero de orden en base a la cantidad de documentos.

OrdenSchema.methods.toJSON = function(){
    const {_id,...data} = this.toObject();
    data.id = _id;
    return data;
  }


module.exports = mongoose.model('Orden',OrdenSchema);