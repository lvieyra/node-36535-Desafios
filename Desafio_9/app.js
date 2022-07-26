const { engine } = require('express-handlebars');
const contenedor = require('./containers/contenedor.js');
const contenedorMongoDB = require('./containers/contenedorMongoDB.js');
const repositorio = require('./containers/repositorio.js');
const { mongoConnection } = require('./config/globals.js');
const productosTest = require('./routes/productosTest.js');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT= 8080;
const path = require('path');
const Normalizer = require('./models/normalizer')
const normalizer = new Normalizer();

const productos = new contenedor();
const mensajes = new contenedorMongoDB(); 

mongoConnection(); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.engine('handlebars', engine());

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/api/productos-test', productosTest);


io.on('connection', async socket => {
    socket.emit('productos', await productos.getAll());
    socket.emit('mensajes', await mensajes.getAll());


    socket.on('agregarProducto',async (data) =>{
            await productos.save(data)
            io.sockets.emit('productos',await productos.getAll());
    });

    socket.emit('mensajes',await mensajes.getAll());
    
    const message = await mensajes.getAll();
    const data = normalizer.getDataNormalized(message)
    

    socket.emit('mensajes', data);

    socket.on('agregarMensaje',async (data) =>{
      
        if (data.email =='' && data.message == '') { data.date=''};
        
        await mensajes.save(data)
        
        io.sockets.emit('mensajes',await mensajes.getAll())
       
    })
});

http.listen(PORT, ()=>{
    console.log('Se levanto el server en el port: '+PORT);
});