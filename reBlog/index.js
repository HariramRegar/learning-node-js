
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
const port = 3000;
app.get("/", function(req, res) {
  res.send("calculator.html");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
