const express = require('express')
const app = express();
const productosRouter = require('./src/routers/productos.Router');
//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.get('/', (req, res)=> {
    res.json({
        "Title": "Hola mundo"
    })
});
app.use('/api/productos',productosRouter)
// app.use('/productos/:id', (req, res)=> {
//     res.json(`Parametro ${req.params.id}`)
// });
// app.use('/productos/:id',(req, res)=> {
//     console.log(req.params.id)
// })
app.use('/productos',productosRouter);
    

app.listen(app.get('port'), ()=>{
    console.log(`Se levanto el Sever: ${app.get('port')}`)})