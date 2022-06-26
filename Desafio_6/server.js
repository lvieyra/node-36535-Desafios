const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

app.set('port', process.env.PORT|8080);
app.use(express.static(path.join(__dirname, 'public')));

const productos=[]; 
const fs = require('fs');
io.on('connection',(socket) =>{
    console.log('New user')
    
    socket.emit('productos',productos);
    socket.on('agregarProducto',(data) =>{
        console.log(data);
        productos.push(data);
       
            io.sockets.emit('productos',productos);
       
       
    });
})
server.listen(app.get('port'), () => {
    console.log(`El servidor se levanto en el puerto ${app.get('port')}`);
})