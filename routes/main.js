const router = require('express').Router();

//routing data
const nav ={
    local: ''
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

module.exports = router;