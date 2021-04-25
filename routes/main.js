const router = require('express').Router();
const User = require('../config/model/User')

//routing data
const nav ={
    local: '',
    username: ''
}


//routes
router.get('/', (req, res) => {
    nav.local = 'home';
    res.render('pages/home', { nav : nav })
});
router.get('/login', (req, res) => {
    nav.local = 'login';
    res.render('pages/login', { nav : nav });
});
router.get('/register', (req, res) => {
    nav.local = 'register';
    res.render('pages/register', { nav : nav })
});

//login success or fail
router.get('/loginsuccess', async (req, res) => {
    if(req.isAuthenticated()){
        const userid = req.session.passport.user;
        const user = await User.findById(userid);
        nav.username = user.username;
        nav.local = 'loginok'
        console.log(`${user.username} is loged in on protected route`);
        res.render('pages/loginsucess', { nav : nav });
    } else {
        res.redirect('/')
    }
});
router.get('/loginfail', (req, res) => {
    nav.local = 'loginfail'
    res.render('pages/loginfail', { nav : nav });
});

//logoout session and user routes
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
module.exports = router;