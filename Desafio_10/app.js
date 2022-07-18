const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('./models/User.js');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


app.use(session({
    key: 'user_sid',
    secret: 'maxi',
    resave: true,
    saveUninitialized: true,
    cookie:{maxAge: 60000}
}));

app.use(cookieParser());
// Se indica el directorio donde se almacenarán las plantillas 
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'dashboard',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
}));

// Se indica el motor del plantillas a utilizar
app.set('view engine', '.hbs');



app.use(express.urlencoded({ extended: true }));
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server Up! ${PORT}`);
});


const sessionCheck =(req, res, next) => {
    
    if(req.session.user && req.cookies.user_sid){

       res.redirect('/dashboard');
    }else{
       
        next();
    }
};
app.get('/', sessionCheck, (req, res) => {
    res.redirect('/login');
});

app.get('/login', sessionCheck, (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login',sessionCheck,(req,res) =>{
   
        const {username} = req.body;
        if(username){
            req.session.user = username
           res.redirect('/dashboard');
        }else{
            res.redirect('/login');
        }
})

app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        console.log(req.cookies.user_sid);
        res.render('plantilla.hbs',{title: req.session.user})
    } else {
        res.redirect('/login');
    }
})

app.get('/logout', (req, res) => { 
    if (req.session.user != undefined) {
        const username = req.session.user;
    
        req.session.destroy(() => {
    
            req.session = null;
    
            res.render("logout.hbs",{
                title: username
    
            });
        });
    
    }else{
        res.redirect('/login');
    }
})