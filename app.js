const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const authRouters = require('./routes/authRouters');
var path = require('path');

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

// database connection
const database = process.env.MONGO_DB;
mongoose
  .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("http://localhost:3000"))
  .catch((err) => console.log(err));

// router
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) =>res.render('smoothies'));
app.use(authRouters);

//Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server has started at port " + PORT));
