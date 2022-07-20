const User = require('../modules/User.js');

const login = (req,res)=>{
     res.render('login.hbs')
};

const loginPost = async (req,res)=>{
    try {
            const {username, password} = req.body;
            const docs = await User.findOne({ username: username });
            const comp = docs.comparePassword(password, docs.password);
            if(comp){
                req.session.user = docs;
                res.render('dashboard.hbs', { titulo: 'Bienvenido  ' + req.session.user.username });
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
    if (req.session) {
        const username = req.session.user;
        req.session.destroy(() => {
            req.session = null
            res.render('logout.hbs', { titulo: 'Hasta luego  ' + username.username });
        })
    }
}
module.exports = {
    login,
    loginPost,
    signup,
    getSignup,
    dashboard,
    logout    }