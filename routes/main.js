const router = require('express').Router();
const {isAuth} = require('../routes/middleware/authorization')

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
router.get('/loginsuccess',isAuth, (req, res) => {
        nav.username = req.user.username;
        nav.local = 'loginok'
        res.render('pages/loginsucess', { nav : nav });
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