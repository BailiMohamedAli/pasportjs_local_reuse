const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const PORT = 3003;
//connecting to DB
require('./config/database');
//setup view engine, assets dir and bassic json protocol
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const nav ={
    local: ''
}

//routes
app.get('/', (req, res) => {
    nav.local = 'home';
    res.render('pages/home', { nav : nav })
});
app.get('/login', (req, res) => {
    nav.local = 'login';
    res.render('pages/login', { nav : nav });
});
app.get('/register', (req, res) => {
    nav.local = 'register';
    res.render('pages/register', { nav : nav })
});
app.use('/user', require('./routes/user'));

//listning to server
app.listen(PORT, () => console.log(`server runnig on port ${PORT}`));