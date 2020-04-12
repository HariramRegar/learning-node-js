const express = require('express');
const app = express();
caonst port = 3000;

app.get("/", function(req,res) {
  res.send("Chal rha hai bhai...");
});

app.get("/contact", function(req,res) {
  res.send("Contat me via email : contactme@gmail.com");
});

app.get("/about", function(req,res) {
  res.send("About page");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
