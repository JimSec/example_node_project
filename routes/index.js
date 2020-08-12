var express = require('express');
const fs = require('fs');
var router = express.Router();

var runner = require('../runner.js');


var json_path = "db/db.json";
var rawdata = fs.readFileSync(json_path);
var jdata = JSON.parse(rawdata);

/* GET home page. */
router.get('/', function(req, res, next) {
  runner.main();
  var rawdata = fs.readFileSync(json_path);
  var jdata = JSON.parse(rawdata);
  
  //Poor form, want to make this seperate service later
  res.render('index', { title: 'Express', data: jdata });
});

module.exports = router;
