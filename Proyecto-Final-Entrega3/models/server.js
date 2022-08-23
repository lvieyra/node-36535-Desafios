const express = require("express");
const cors = require("cors");
const {
  loguearPeticiones,
  loguearRutaNoImplementada,
} = require("../middlewares/loguear-peticiones");
const logger = require("../helpers/winston-helper");
const { dbConnection } = require("../database/config");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";
    this.productosPath = "/api/productos";
    this.carritosPath = "/api/carritos";
    this.checkoutPath = "/api/checkout";
    
  }

  async conectarDB() {
    try {
      await dbConnection();
    } catch (error) {
      logger.log(
        "error",
        `Hubo un error al conectarse con la base de datos: ${error}`
      );
    }
  }

  middlewares() {
    //Loguear todas las peticiones recibidas
    this.app.use(loguearPeticiones);
    // cors
    this.app.use(cors());
    // Parseo del body
    this.app.use(express.json());
    // server static
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.productosPath, require("../routes/productos"));
    this.app.use(this.carritosPath, require("../routes/carritos"));
    this.app.use(this.checkoutPath, require("../routes/checkout"));
    
    //loguear las peticiones no implementadas
    this.app.use(loguearRutaNoImplementada);
  }

  listen() {
    if(cluster.isPrimary && process.env.MODE === "cluster"){
      console.log(`Inicializando en modo cluster`);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker: ${worker.process.pid} died`);
      });
    } else {
      return this.app.listen(this.port, () => {
        console.log("Servidor corriendo en puerto", this.port, process.pid);
      });
    }
  }
}

module.exports = Server;
