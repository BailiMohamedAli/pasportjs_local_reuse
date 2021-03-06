const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const PORT = 3003;
//connecting to DB
require('./config/database');
//session bassed passport js
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
//setup view engine, assets dir and bassic json protocol
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//seting up express session with connect-mongodb
const sessionStore = MongoStore.create({ 
    mongoUrl: process.env.DB_STRING, 
    collection: 'sessions',
    ttl: 24*60*60,
    autoRemove: 'native'
});
app.use(session({
    secret: process.env.SECRET_SESS,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day
    }
}));
//initialize passport JS
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use(require('./routes/main'));
app.use('/user', require('./routes/user'));

//listning to server
app.listen(PORT, () => console.log(`server runnig on port ${PORT}:\nhttp://localhost:${PORT}`));