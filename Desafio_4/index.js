const express = require('express')
const app = express();
const productosRouter = require('./src/routers/productos.Router');
const productosFormRouter = require('./src/routers/productosFormRouter');
const path = require('path');
//Configuraciones
app.set('port', process.env.PORT || 8080);
app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src/public')))
app.use('/api/productos',productosRouter);
app.use('/productos', productosFormRouter);
app.listen(app.get('port'), ()=>{
    console.log(`Se levanto el Server: ${app.get('port')}`)})