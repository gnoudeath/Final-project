const mongoose = require('mongoose');
const express = require('express');

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://project:duongntgch190718@project.8cuvkmb.mongodb.net/test';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  // router
  app.get('/', (req, res) => res.render('home'));
  app.get('/smoothies', (req, res) =>res.render('smoothies'));
