const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    descripcion:{
        type: String,
        required: false,
    },
    codigo:{
        type: String,
        required: [true, 'El codigo es obligatorio'],
    },
    imagen:{
        type: String,
        required: [true, 'La imagen es obligatoria'],
    },
    precio:{
        type: Number,
        required: [true, 'El precio es obligatorio'],
    },
    stock:{
        type: Number,
        required: [true, 'El stock es obligatorio'],
    },
    timestamp:{
        type : Date, default: Date.now
    }
});

ProductoSchema.methods.toJSON = function(){
  const {__v,_id,...data} = this.toObject();
  data.id = _id;
  return data;
}

module.exports = model("Producto", ProductoSchema);