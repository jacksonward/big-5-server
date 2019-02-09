var fs = require("fs");
var handlebars = require("handlebars");
var inFile = "./hbs/report.hbs";
var outFile = "./report.html";

var ztable = require("ztable");

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

function roundToTwo(num) {    
  return +(Math.round(num + "e+2")  + "e-2");
}

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static("./"));

//Trait Calculations
app.post("/testsubmit", function(req, res) {
  
  //Initialize trait variables
  var neuroticism = parseInt(0);
  var extroversion = parseInt(0);
  var openness = parseInt(0);
  var agreeableness = parseInt(0);
  var conscientiousness = parseInt(0);
  
  //Keep track of #of questions answered for each trait so that we can average the trait later
  var nq = parseInt(0);
  var eq = parseInt(0);
  var oq = parseInt(0);
  var aq = parseInt(0);
  var cq = parseInt(0);

  //Initialize percentile variables to be calculated with ztable
  npercentile = parseInt(0);
  epercentile = parseInt(0);
  opercentile = parseInt(0);
  apercentile = parseInt(0);
  cpercentile = parseInt(0);

  //Neuroticism
  for (var key in req.body) {
    if (key.includes("N")) {
      nq ++;
      neuroticism += parseInt(req.body[key]);
    }
  }

  //Extroversion
  for (var key in req.body) {
    if (key.includes("E")) {
      eq ++;
      extroversion += parseInt(req.body[key]);
    }
  }

  //Openness
  for (var key in req.body) {
    if (key.includes("O")) {
      oq ++;
      openness += parseInt(req.body[key]);
    }
  }

  //Agreeableness
  for (var key in req.body) {
    if (key.includes("A")) {
      aq ++;
      agreeableness += parseInt(req.body[key]);
    }
  }

  //Conscientiousness
  for (var key in req.body) {
    if (key.includes("C")) {
      cq ++;
      conscientiousness += parseInt(req.body[key]);
    }
  }
  
  //Make sure nq..etc are not ZERO, which would make traits non-numerical
  if (nq === 0) {
    nq = 1;
  }
  if (eq === 0) {
    eq = 1;
  }
  if (oq === 0) {
    oq = 1;
  }
  if (aq === 0) {
    aq = 1;
  }
  if (cq === 0) {
    cq = 1;
  }

  //Calculate personal value here so it can be used in profile
  neuroticism = (neuroticism / nq);
  extroversion = (extroversion / eq);
  openness = (openness / oq);
  agreeableness = (agreeableness / aq);
  conscientiousness = (conscientiousness / cq);

  //Percentiles are calculated by subtracting trait mean from user value, 
  //dividing that by trait std deviation, and then multiplying by 100
  var profile = {
    neuroticism: neuroticism,
    extroversion: extroversion,
    openness: openness,
    agreeableness: agreeableness,
    conscientiousness: conscientiousness,
    npercentile: roundToTwo(ztable((neuroticism - 3.095192454) / 0.6716282482) * 100),
    epercentile: roundToTwo(ztable((extroversion - 3.076565749) / 0.3522392277) * 100),
    opercentile: roundToTwo(ztable((openness - 3.313479385) / 0.384431613) * 100),
    apercentile: roundToTwo(ztable((agreeableness - 3.204935388) / 0.3543837412) * 100),
    cpercentile: roundToTwo(ztable((conscientiousness - 3.154749227) / 0.3885176637) * 100)
  };

  var source = fs.readFileSync(inFile, "utf8");
  var template = handlebars.compile(source, { strict: true });
  var result = template(profile);

  fs.writeFileSync(outFile, result);
  console.log(`File written to ${outFile}`)

  res.sendFile(__dirname + "/report.html");

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);