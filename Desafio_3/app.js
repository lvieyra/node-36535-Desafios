const fs = require('fs/promises');
const { mainModule } = require('process');
const contenedor = require("./clases/contenedor");
const productos = require("./clases/productos");
const recipiente = new contenedor('productos.txt',fs);

const producto1 = new productos('Fiambre',2000,'https://http2.mlstatic.com/D_NQ_NP_354421-MLA20792476092_062016-O.webp');
const producto2 = new productos('Queso',3000,'https://http2.mlstatic.com/D_NQ_NP_647758-MLA49184314944_022022-O.webp');
const producto3 = new productos('Aceite',2400,'https://http2.mlstatic.com/D_NQ_NP_715774-MLA43642933014_102020-O.webp');

 
 const express = require('express');
 const port = 8080;
 const app = express();
 app.get('/productos', async(req, res) => {
       try {
              console.log(await recipiente.getAll());
              const products = await recipiente.getAll();
              res.status(200).json( products);
        
       } catch (error) {
              res.status(500).json({
                     error: 'Error del servidor'
              })
       }
       
        
 });
 app.get('/productoRandom', async(req, res) => {
       try {  
              const productos = await recipiente.getAll();
              const item = productos[Math.floor(Math.random()*productos.length)];
              res.status(200).json(item);
       } catch (error) {
              res.status(500).json({ error: 'Error del servidor'});
       }
       
 })
 app.use(express.json());
 app.listen(port, ()=>{
        console.log(`Se levanto el Server: ${port}`);
 });
