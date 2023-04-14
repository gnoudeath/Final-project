// dotenv
require("dotenv").config;
// connecy DB
const {connectDB} = require('./config/db');
connectDB();
const express = require('express');
const authRouters = require('./routes/authRouters');
const coursesRouters = require('./routes/coursesRouters');
var path = require('path');
const cookieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./middleware/authMiddleware')
const app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// middleware
app.use(express.static('public'));
app.use('/bootstrap', express.static(__dirname + '/public/bootstrap'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/scss', express.static(__dirname + '/public/scss'));
app.use('/mail', express.static(__dirname + '/public/js'));
app.use('/lib', express.static(__dirname + '/public/js'));
app.use(express.json());

app.use(cookieParser());

// các route khác
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
// app.get('/', requireAuth, (req, res) =>res.render('home'));
app.use(authRouters);
app.use(coursesRouters);



// cookies
app.get('/set-cookies', (req, res) => {
  // res.setHeader('Set-Cookie', 'newUser=true');
  res.cookie('newUser', false);
  res.cookie('isClient', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

  res.send('you got the cookies!');
});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);

});


//Port
const port = process.env.APP_PORT;
app.listen(port, console.log("Server has started at port " + port));
