const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const authRouters = require('./routes/authRouters');
var path = require('path');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware')
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
app.use(express.json());

app.use(cookieParser());

// database connection
const database = process.env.MONGO_DB;
mongoose
  .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("http://localhost:3000"))
  .catch((err) => console.log(err));

// router
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) =>res.render('smoothies'));
app.use(authRouters);

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
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server has started at port " + PORT));
