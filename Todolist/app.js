const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("Public"));
app.get('/', function(req, res) {
  var todays = new Date();
  var today = todays.getDay();
  var day = "";
  switch (today) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      console.log(Error);
  }
  res.render("list", {
    kindOfDay: day
  });
});

app.listen(3000, function() {
  console.log("server is running at port 3000");
});
