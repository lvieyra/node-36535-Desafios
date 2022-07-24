require("dotenv/config");
const argv = require('./config_yargs.js');
const express = require('express');
const session  = require('express-session');
const cookieParser = require("cookie-parser");
const exphbs = require('express-handlebars');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const app = express();
const users = require('./routes/users.js');

/* por consola para el puerto es -p */
const PORT = argv.p || 8080;

const path = require('path');
const{initPassport} = require('./passport_config.js')
const mongoose = require('mongoose');



app.use(express.json())
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

const connect =  mongoose.connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

let baseSession = session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI}),
    key: 'user_sid',
    secret: 'coder',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
});

app.use(cookieParser());
app.use(baseSession);

app.use('/', users);
initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.post('/register', passport.authenticate('register', { failureRedirect: '/failedRegister'}), (req, res) => {
    res.send({message: "signed up"})
})

app.get('/failedRegister', (req, res) => {
    res.send({error: "I cannot register"})
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/failedLogin'}), (req, res) => {
    res.send({message: "Logged In"})
})

app.post('/failedLogin', (req, res) => {
    res.send({error: "I cannot login"})
})

app.get('/currentSession', (req, res) => {
    
    res.send(req.user)
})

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { console.log(err) }
        else res.send({message: "Logged out"})
    })
})


app.listen(PORT, () => console.log("Server Up: " + PORT));

