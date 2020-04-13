const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var _ = require('lodash');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
const port = 3000;

mongoose.connect("mongodb://localhost:27017/blogBD", {useNewUrlParser: true});
const postSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postSchema);
let posts = [];

app.get("/", function(req, res) {
  Post.find({}, function(err, posts){

    res.render("index", {
      posts: posts
      });
  });
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
  const post = new Post ({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);

  post.save();

  res.redirect('/');
});


app.get("/posts/:postName", function(req, res) {
  const reqTitle = _.lowerCase(req.params.postName);
    Post.find({}, function(err, posts){
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if(reqTitle  === storedTitle){
      res.render('postpage', {post:post});
    } else{
      console.log('not match');
    }
  })
});
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
