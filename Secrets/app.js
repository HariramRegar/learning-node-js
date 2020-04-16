//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true
});

const userSchema = {
  email: String,
  password: String,
}

const User = new mongoose.model("User", userSchema);

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', function(req, res) {
  const email = req.body.username;
  const password = req.body.password;
  User.findOne({
    email: email
  }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser.password == password) {
        res.render('secrets');
      } else {
        console.log("password not match");
      }
    }
  });
});

app.get('/register', function(req, res) {
  res.render('register');
});

app.post('/register', function(req, res) {
  const user = new User({
    email: req.body.username,
    password: req.body.password,
  });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.render('register');
    } else {
      res.render('secrets', {user:foundUser})
    }
  });
});

app.listen(3000, function(req, res) {
  console.log('port is running...');
});
