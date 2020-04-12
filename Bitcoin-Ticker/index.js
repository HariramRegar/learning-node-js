const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
const port = 3000;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  console.log(req.body.crypto);
  request("url", function(err, res, body) {
    console.log(res);
  });
  res.send(req.body.crypto +" "+ req.body.fiat);
  //res.sendFile(__dirname + "/index.html");
});


app.listen(port, function() {
  console.log("http://127.0.0.1:3000/");
});
