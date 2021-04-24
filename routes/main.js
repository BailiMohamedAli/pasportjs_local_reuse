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
        nav.local = 'loginok'
        console.log(req.session.passport.user);
        const userid = req.session.passport.user;
        const user = await User.findById(userid);
        console.log(user);
        nav.username = user.username;
        console.log(nav);
        res.render('pages/loginsucess', { nav : nav })
    } else {
        res.redirect('/')
    }
});
router.get('/loginfail', (req, res) => {
    res.redirect('/');
});

//logoout session and user routes
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
module.exports = router;