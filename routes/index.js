var express = require('express');
var router = express.Router();
let htmlWriter = require('../modules/htmlWriter.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  let promise = htmlWriter.init('example.html', 'htmlExamples', 'index.html');
  promise.then(function() {
    res.render('index', { title: 'HTML write succeeded' });
  });
  res.render('index', { title: 'HTML write failed' });
});

module.exports = router;
