const { Schema, model } = require("mongoose");
const Producto = require('./producto.js');

const CarritoSchema = new Schema({
    timestamp:{
        type : Date, default: Date.now
    },
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
    },
    productos : [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Producto'
        },
        cantidad: {
            type: Number,
            required: true
        }
    }
    ]
});

CarritoSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
  }
module.exports = model("Carrito", CarritoSchema);
