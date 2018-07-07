var fs = require("fs");
var handlebars = require("handlebars");
var inFile = "./hbs/report.hbs";
var outFile = "./report.html";

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static("./"))

//Trait Calculations
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
  var profile = {
    neuroticism: neuroticism,
    extroversion: extroversion,
    openness: openness,
    agreeableness: agreeableness,
    conscientiousness: conscientiousness
  };

  var source = fs.readFileSync(inFile, "utf8");
  var template = handlebars.compile(source, { strict: true });
  var result = template(profile);

  console.log(result);

  fs.writeFileSync(outFile, result);
  console.log(`File written to ${outFile}`)

  res.sendFile(__dirname + "/report.html");

});

app.listen(8080, function() {
  console.log("Server running on port 8080");
});