require('dotenv').config()
const ProductoDaoMongo  = require('../dao/productos/productosDaoMongo.js')
const CarritoDaoMongo = require('../dao/carrito/carritosDaoMongo.js')
const ProductoDaoFirestore = require('../dao/productos/productosDaoFirestore.js')
const CarritoDaoFirestore = require('../dao/carrito/carritosDaoFirestore.js')
let productoSeleccionado;
let carritoSeleccionado;
if(process.env.BASEDATOS == 'MONGO'){
    
     productoSeleccionado =  ProductoDaoMongo
     carritoSeleccionado  =  CarritoDaoMongo

}else{
     productoSeleccionado =  ProductoDaoFirestore
     carritoSeleccionado = CarritoDaoFirestore
}
module.exports = {
    productoSeleccionado,
    carritoSeleccionado 
}