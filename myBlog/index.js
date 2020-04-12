const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
const port = 3000;
var posts = [{title:"Title",content: "Content"}];

app.get("/", function(req, res) {
  res.render('index', {posts:posts});
});

app.get("/about", function(req, res) {
  res.render('about', {about:"About"});
});

app.get("/contact", function(req, res) {
  res.render('contact', {contact:"Contact"});
});

app.get("/compose", function(req, res) {
  res.render('compose');
});

app.post("/compose", function(req, res) {
  var post = req.body;
  posts.push(post);
  res.redirect('/compose');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
