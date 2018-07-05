var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.post("/testsubmit", function(req, res) {
  var extroversion = parseInt(0);
  console.log(req.body);
  console.log('Answer to first question: "' + req.body.EXT1 + '".');
  for (var key in req.body) {
    if (key.includes("EXT")) {
      console.log(req.body[key]);
      extroversion += parseInt(req.body[key]);
    }
  }
  console.log("extroversion: " + extroversion);
});

app.listen(8080, function() {
  console.log("Server running on port 8080");
});