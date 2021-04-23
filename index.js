const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const PORT = 3003;
//setup view engine, assets dir and bassic json protocol
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.get('/', (req, res) => res.render('pages/home'));

//listning to server
app.listen(PORT, () => console.log(`server runnig on port ${PORT}`));