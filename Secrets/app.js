require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
//const md5 = require('md5')
// const encrypt = require('mongoose-encryption');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// const secret = process.env.SECRET;
// userSchema.plugin(encrypt, {
//   secret: secret,
//   encryptedFields: ['password']
// });

userSchema.plugin(passportLocalMongoose);

mongoose.set('useCreateIndex', true)
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post("/login", function(req, res) {
  const user = new User({
    username : req.body.username,
    password : req.body.password,
  });
  req.login(user,function(err){
    if(err){
      console.log(err);
    } else{
      passport.authenticate('local')(req, res, function() {
        res.redirect('/secrets');
      });
    }
  });


  // const username = req.body.username;
  // // const  password= md5(req.body.password);
  // const password = req.body.password;
  //
  // User.findOne({
  //   email: username
  // }, function(err, foundUser) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     if (foundUser) {
  //       bcrypt.compare(password, foundUser.password, function(err, result) {
  //         if (result == true) {
  //           res.render('secrets');
  //         }
  //       });
  //     }
  //   }
  // });
});

app.get('/register', function(req, res) {
  res.render('register');
});

app.get('/secrets', function(req, res) {
  if (req.isAuthenticated()) {
    res.render('secrets');
  } else {
    res.redirect('/login');
  }
});

app.post('/register', function(req, res) {
  User.register( {username: req.body.username  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/secrets');
      });
    }
  });
  // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  //   const user = new User({
  //     email: req.body.username,
  //     password: hash,
  //   });
  //   user.save(function(err) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.render('secrets');
  //     }
  //   });
  // });
});


app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(3000, function(req, res) {
  console.log('port is running...');
});
