const fs = require('fs/promises');
const { mainModule } = require('process');
const contenedor = require("./clases/contenedor");
const productos = require("./clases/productos");

const recipiente = new contenedor('productos.txt',fs);

const producto1 = new productos('Fiambre',2000,'./jamon-crudo.png');
const producto2 = new productos('Queso',3000,'./queso-pantegras.webp');

 

const main = async () =>{ 
        console.log(await recipiente.save(producto1));                  
        console.log(await recipiente.save(producto2));                 
        console.log(await recipiente.getAll());
       //console.log(await recipiente.getById());
       //console.log(await recipiente.deleteById());
       //console.log(await recipiente.deleteAll());
}

   main()
 