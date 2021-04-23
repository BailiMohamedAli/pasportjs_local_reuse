const User = require('../config/model/User');
const router = require('express').Router();


router.post('/submitregister', (req, res) => {
    console.log(req.body);
    res.redirect('/')
});

router.post('/submitlogin', (req, res) => {
    console.log(req.body);
    res.redirect('/')
});

module.exports = router;