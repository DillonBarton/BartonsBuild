require('dotenv').config();
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    path = require('path'),
    PORT = process.env.PORT || 3000;

/*
Express Session Settings
Secret for session stored in .env file in user directory.
 */
app.use(expressSession({
    secret: process.env.ES_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())
// TODO: Set expiry date on cookies
app.use(cookieParser(
    process.env.ES_SECRET // TODO: Test if this works or should be removed
))
app.use(express.json())

/*
Directory and View Engine Setup
View Engine Used: ejs
Views Location: './views'
Public Location: './public'
 */
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    return res.render('homepage')
})

app.get('/what-we-do', (req, res) => {
    return res.render('what-we-do')
})

app.get('/contact-us', (req, res) => {
    return res.render('contact-us')
})

app.get('/reviews', (req, res) => {
    return res.render('reviews')
})

/*
Run Server
PORT = 3000 or declared in .env file
 */
app.listen(PORT, () => {
    console.log("Server running on port:", PORT)
})
