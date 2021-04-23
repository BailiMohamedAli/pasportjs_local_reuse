const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./model/User');
const {validPassword} = require('./lib/passwordUtils');

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = async (username, password, done) => {
    console.log('username: ',username , 'passwod: ',password);
    try {
        const user = await User.findOne({ email: username });
        console.log('werein the pasport start');
        console.log(user);
        if (!user) return done(null, false);
        if (user) {
            //this is the verification function for the password provided by the user
            const isValid = validPassword(password, user.hash, user.salt);
            console.log('validation complete: ', isValid);
            //just to separate
            return isValid ? done(null, user) : done(null, false);
        }
    } catch (err) {
        done(err)
    }
};
const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

//serialasing Deseirializing passport js
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then(user => done(null, user))
    .catch(err => done(err));
});