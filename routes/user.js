const User = require('../config/model/User');
const router = require('express').Router();
const passport = require('passport');
const {genPassword} = require('../config/lib/passwordUtils');

router.post('/login', passport.authenticate(
    'local', 
    {failureRedirect: '/loginfail', 
    successRedirect: '/loginsuccess'
}));

//registration 
router.post('/register', async (req, res) => {
    const salthash = genPassword(req.body.password);
    const salt = salthash.salt;
    const hash = salthash.hash;
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        salt: salt,
        hash: hash
    })
    try {
        const addUser = await newUser.save();
        if(!addUser) throw new Error ('registration process failed!');
        res.status(200).redirect('/login');
    } catch (err) {
        log.error(err);
    }
});



module.exports = router;