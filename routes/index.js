var express = require('express');
var router = express.Router();
let htmlWriter = require('../modules/htmlWriter.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  let promise = htmlWriter.init('example.html', 'htmlExamples/my_example', './boilerplates/html/index.html');
  promise.then(function() {
    res.render('index', { title: 'HTML write succeeded' });
  });
  promise.catch(function(e) {
    console.log('an error has occurred: '+e);
    reject(e);
  });
});

module.exports = router;
