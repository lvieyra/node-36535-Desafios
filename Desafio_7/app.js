
const contenedor = require('./models/contenedor.js');
const repositorio = require('./models/repositorio.js');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT= 8080;
const path = require('path');

const productos = new contenedor();
const mensajes = new repositorio(); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

io.on('connection', async socket => {
    socket.emit('productos', await productos.getAll());
    
    socket.on('agregarProducto',async (data) =>{
            await productos.save(data)
            io.sockets.emit('productos',await productos.getAll());
    });

    socket.emit('mensajes',await mensajes.getAll());
 

    socket.on('agregarMensaje',async (data) =>{
      
        if (data.email =='' && data.message == '') { data.date=''};
        
        await mensajes.save(data)
        io.sockets.emit('mensajes',await mensajes.getAll())
       
    })
});

http.listen(PORT, ()=>{
    console.log('Se levanto el server en el port: '+PORT);
});