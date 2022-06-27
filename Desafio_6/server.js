const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

app.set('port', process.env.PORT|8080);
app.use(express.static(path.join(__dirname, 'public')));

const productos=[]; 
const mensajes=[]; 
io.on('connection',(socket) =>{
    console.log('New user')
    
    socket.emit('productos',productos);
    socket.on('agregarProducto',(data) =>{
        console.log(data);
        productos.push(data);
            io.sockets.emit('productos',productos);
    });

    socket.emit('mensajes',mensajes);

    socket.on('agregarMensaje',(data) =>{
        console.log(data);
        if (data.email =='' && data.message == '') { data.date=''};
        mensajes.push(data);
        io.sockets.emit('mensajes',mensajes);
    })
})
server.listen(app.get('port'), () => {
    console.log(`El servidor se levanto en el puerto ${app.get('port')}`);
})