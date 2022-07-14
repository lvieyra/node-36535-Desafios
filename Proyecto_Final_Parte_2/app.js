require('dotenv').config()

const { mongoConnection } = require('./src/config/globals')

global.Administrador = true;

const express = require('express');
const cors = require('cors');
const app = express();

const path = require('path');
const PORT = 8080;

const routerProductos = require('./src/routes/productos.js');
const routerCarrito = require('./src/routes/carrito.js');

app.use(cors());
app.use(express.json());


if(process.env.BASEDATOS == 'MONGO'){
    //Se genera conexion con MongoDb
    mongoConnection(); 
}


console.log('Firebase conectado')


app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

app.listen(PORT, ()=>console.log(`El servidor de levanto en el puerto ${PORT}`));

