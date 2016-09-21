var express = require('express');
var router = express.Router();
let htmlWriter = require('../modules/htmlWriter.js');

/* GET home page. */
router.get('/', function(req, res, next) {

  let output = 'OUTPUT: ';

  let promise1 = htmlWriter.init('example.html', 'htmlExamples/my_example', './boilerplates/html/index.html');
  promise1.then(function(file) {
    let promise2 = htmlWriter.append('hi');
    promise2.then(function() {
      console.log('test');
      output += JSON.stringify(file);
      res.render('index', { output });
    }).catch(function(e) {
      console.log('an error has occurred in promise2: '+e);
      output += 'HTML write FAILED: '+e;
      res.render('index', { output });
    });
  }).catch(function(e) {
    console.log('an error has occurred: '+e);
    output += 'HTML write FAILED: '+e;
    res.render('index', { output });
  });
});

module.exports = router;
