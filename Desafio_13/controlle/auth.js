const User = require('../modules/User.js');
const process = require('process');
const { execPath } = require('process');

const {fork} = require('child_process');

const informacion = (req, res) => {
    const info ={
        arg: process.argv.slice(2),
        plataforma: process.platform,
        version: process.version,
        memoria_rss: process.memoryUsage().rss,
        directorio: execPath,
        pid:process.pid,
        proyecto: process.cwd(),
}


 res.render('info.hbs', info)
}

const calculoRandoms = (req, res) => {
    const cant = req.query.cant || 1000000;
    const child = fork('./obtenerRandom.js')
    child.send(cant)

    child.on("message",(result)=>{
        res.send(result);
    })
}


const login = (req,res)=>{
     res.render('login.hbs')
};

const loginPost = async (req,res)=>{
    try {
            const {username, password} = req.body;
            const docs = await User.findOne({ username: username })
            if (docs != null) { 
                const comp = docs.comparePassword(password, docs.password);
                if(comp){
                    req.session.user = docs;
                    res.render('dashboard.hbs', { titulo: 'Bienvenido  ' + req.session.user.username });
                }else{
                    res.render('login.hbs');
                } 
            }else{
                res.render('login.hbs');
            }
            
           
    } catch (error) {
        console.log(error);
    }
    

};

const getSignup = (req,res)=>{
    res.render('signup.hbs');
};

const signup = (req,res)=>{
   
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.save((err, docs) => {
        console.log(user)
        if (err) {
            console.log(err);
            res.render('signup.hbs');
        } else {
            req.session.user = docs;
            res.render('dashboard.hbs', { titulo: 'Bienvenido  ' + req.session.user.username });
        }
    })
};

const dashboard = (req,res)=>{
    if (req.session.user && req.cookies.user_sid) {
        res.render('dashboard.hbs');
    } else {
        res.render('login.hbs');
    }
};

const logout = (req,res)=>{
    if (req.session.user != undefined) {
        const username = req.session.user;
        req.session.destroy(() => {
            req.session = null
            res.render('logout.hbs', { titulo: 'Hasta luego  ' + username.username });
        })
    }
    res.render('logout.hbs', { titulo: 'Salir de la session'});
}
module.exports = {
    login,
    loginPost,
    signup,
    getSignup,
    dashboard,
    logout,
    calculoRandoms,
    informacion }