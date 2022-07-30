const express = require('express');
const router = express.Router();
const compression = require('compression');
const {sessionChecker} = require('../middlewares/sessionChecker.js')
const {
    login,
    loginPost,
    signup,
    getSignup,
    dashboard,
    logout,
    calculoRandoms,
informacion} = require('../controlle/auth.js')

router.get('/info',compression({
           level: 0
               }), informacion)  
router.get('/api/randoms', calculoRandoms)
router.get('/',sessionChecker,(req, res) => {
  
   res.redirect('/login');
});

router.get('/login',sessionChecker, login) ;

router.post('/login',sessionChecker,loginPost);

router.get('/signup',getSignup) ;
   
router.post('/signup',sessionChecker, signup) ;

router.get('/dashboard', dashboard)

router.get('/logout', logout)


module.exports = router;