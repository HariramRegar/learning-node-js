const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
const port = 3000;

app.get("/", function(req, res) {
  res.render('index');
});

app.post("/", function(req,res) {
  var ans = Number(req.body.a)+ Number(req.body.b);
  res.send("Sum of numbers is "+ ans);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
