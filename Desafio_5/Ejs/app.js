const express = require('express');
const app = express();
const path = require('path');
app.set('port', process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Se indica el directorio donde se almacenarán las plantillas 
app.set('views', path.join(__dirname, 'views'));
// Se indica el motor del plantillas a utilizar
app.set('views engine', 'ejs');

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
    res.render('pages/index.ejs',{productos});
    });


app.listen(app.get('port'),()=>{
    console.log(`El servidor fue levantado http://localhost:${app.get('port')}`);
});