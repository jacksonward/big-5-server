var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.post("/testsubmit", function(req, res) {
  var neuroticism = parseInt(0);
  var extroversion = parseInt(0);
  var openness = parseInt(0);
  var agreeableness = parseInt(0);
  var conscientiousness = parseInt(0);

  console.log(req.body);
  
  //Neuroticism
  for (var key in req.body) {
    if (key.includes("N")) {
      neuroticism += parseInt(req.body[key]);
    }
  }

  //Extroversion
  for (var key in req.body) {
    if (key.includes("E")) {
      extroversion += parseInt(req.body[key]);
    }
  }

  //Openness
  for (var key in req.body) {
    if (key.includes("O")) {
      openness += parseInt(req.body[key]);
    }
  }

  //Agreeableness
  for (var key in req.body) {
    if (key.includes("A")) {
      agreeableness += parseInt(req.body[key]);
    }
  }

  //Conscientiousness
  for (var key in req.body) {
    if (key.includes("C")) {
      conscientiousness += parseInt(req.body[key]);
    }
  }
  console.log("neuroticism: " + neuroticism);
  console.log("extroversion: " + extroversion);
  console.log("openness: " + openness);
  console.log("agreeableness: " + agreeableness);
  console.log("conscientiousness: " + conscientiousness);
});

app.listen(8080, function() {
  console.log("Server running on port 8080");
});