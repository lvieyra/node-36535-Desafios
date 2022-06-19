const express = require('express')
const app = express();
const productosRouter = require('./src/routers/productos.Router');
//Configuraciones
app.set('port', process.env.PORT || 8080);
//app.set('json spaces', 2);
app.use(express.json())

app.use('/api/productos',productosRouter);

app.listen(app.get('port'), ()=>{
    console.log(`Se levanto el Sever: ${app.get('port')}`)})