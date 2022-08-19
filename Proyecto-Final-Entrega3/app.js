require("dotenv").config();

const Server = require("./models/server");

const server = new Server();

// conectar a la BD
server.conectarDB();
// middlewares
server.middlewares();
// Rutas de mi aplicacion
server.routes();

server.listen();
