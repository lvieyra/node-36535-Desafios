const express = require('express');
const path = require('path');
const app = express();

app.set('port',process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended   : true }));
app.use(express.json());

// Se indica el directorio donde se almacenarán las plantillas 
app.set('views', path.join(__dirname, 'views'));

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'pug');

const productos=[];
app.post('/productos', (req, res) => {
    let id = 1;
         if(productos.length !==0){
            id = parseInt(productos[productos.length-1].id) + 1;
         }
         
         const producto = {
            id : id.toString(),
            title : req.body.title,
            price : req.body.price,
            thumbnail : req.body.thumbnail
        } 
    productos.push(producto);
    res.redirect('/');
});

app.get('/productos', (req, res) => {
    res.render('productos.pug',{productos});
    });


app.listen(app.get('port'), ()=>{
console.log(`El servidor esta levantado http://localhost:${app.get('port')}`);
});



