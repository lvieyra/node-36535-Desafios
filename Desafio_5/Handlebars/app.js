const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
//Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
   // partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));


app.set('view engine', '.hbs');
//middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productos = [];
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
    console.log(req.body);
    res.render('productos.hbs',{productos});
    });






app.listen(app.get('port'), () => {
    console.log(`El servidor a sido levantado en port ${app.get('port')}`);
});