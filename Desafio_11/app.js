const express = require('express');
const session  = require('express-session');
const cookieParser = require("cookie-parser");
const exphbs = require('express-handlebars');
const MongoStore = require('connect-mongo');
const app = express();
const users = require('./routes/users.js');
const PORT = 8080;
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
// Se indica el directorio donde se almacenarán las plantillas 
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'index',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
}));

// Se indica el motor del plantillas a utilizar
app.set('view engine', '.hbs');


let baseSession = session({
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/SessionDB'}),
    key: 'user_sid',
    secret: 'coder',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
});

app.use(cookieParser());
app.use(baseSession);

app.use('/', users);
app.listen(PORT, () => console.log("Server Up"));

