const passport = require('passport');
const local = require ('passport-local');
const LocalStrategy = local.Strategy;
const User = require('./modules/User.js');
const users = require('./modules/User.js');
const{ createHash, isValidPassword } = require('./utils.js')


const initPassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            {passReqToCallback: true},
            async (req, username, password,done) =>{
                try {
                    let user = await users.findOne({username})
                    if (user) return done(null,false);
                    const newUser = {
                        username,
                        password:createHash(password),
                        email: req.body.email
                    }
                    try {
                        let result = await users.create(newUser);
                        console.log(result);
                        return done(null,result)
                    } catch (error) {
                        done(error)
                    }
                } catch (error) {
                    done(error)
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy(
            async(username, password, done) => {
                try {
                    let user = await users.findOne({ username })
                    if (!user) return done(null, false, { message: "User does not exists"})
                    if (!isValidPassword(user, password)) return done(null, false, {message: "Invalid password"})
                    return done(null, user)
                } catch(err) {
                    done(err)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        users.findById(id, done)
    })
}

module.exports = {initPassport}