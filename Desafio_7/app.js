
const contenedor = require('./models/contenedor.js');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT= 8080;
const path = require('path');
const productos = new contenedor();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
//const productos=[]; 
//productos.getAll().then((valor)=>{console.log(valor);});
io.on('connection',(socket) => {
    socket.emit('productos',  productos.getAll());
    socket.on('agregarProducto',(data) =>{
       console.log(data);
            io.sockets.emit('productos',productos.save(data));
    });
});

http.listen(PORT, ()=>{
    console.log('Se levanto el server en el port: '+PORT);
});