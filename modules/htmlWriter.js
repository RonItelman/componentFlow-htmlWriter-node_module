/**
* This micro module creates and returns a Promise object after creating a folder if it doesn't exists, creating an html doc and then inserting
* content using Cheerio.
* Steps:
* 1. Checks if a path to a folder exists, and if not, creates one.
* 2. Uses Cheerio to load an html boilerplate and append content.
* 3. Writes the file
* 4. Returns a promise that's resolved if successful, or returns a rejected promise if an error was thrown.
* Usage:
* let htmlWriter = require('htmlWriter');
* htmlWriter.init('my_path'); // creates the folder, loads the html boilerplate
* htmlWriter.append(content); // appends content and writes file
*/

(function() {

  'use strict';

  let cheerio = require('cheerio');
  let fs = require('fs');

  /**
  * @param path {String} the path of the folder which will be created if it does not exist
  **/
  function createFolder(path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
      console.log('path created: '+fs.existsSync(path));
      resolve(path);
    }
  }


  function append(body, css, js, $) {
    // console.log('appendComponent()');
    let head = $('head');
    let script = $('<script type="text/javascript"></script>');
    let body = $('body');
    let style = $('<style type="text/css"></style>');
    let html = $(aComponent.html);
    script.append(aComponent.js);
    body.append(script);
    style.append(aComponent.css);
    head.append(style);
    body.prepend(html);
    return $.html();
  }

  function getTemplateHtml(options) {
    // console.log('options:');
    // console.log(options);
    let file;
    var promise = new Promise(function resolver(resolve, reject) {
      //no option selected
      // if (options.length === 0) {
      //   console.log('getting html');
      //   file = fs.readFileSync('./componentTemplate/responsive/index.html');
      //   resolve(file);
      // }
      // else if (options.jquery == 'true') {
      //   console.log('jquery');
      //   file = fs.readFileSync('./componentTemplate/responsive/index.html');
      //   resolve(file);
      // }
      // else {
      //   console.log('rejected');
      //   reject(file);
      // }
      file = fs.readFileSync('./componentTemplate/responsive/index.html');
      resolve(file);
    });
    return promise;

  }

  //gets an html template and inserts the component's html, js, and css
  function getHtml(aComponent) {
    console.log('getHtml aComponent: ');
    // console.log(aComponent);
    // let promise = getTemplateHtml(aComponent.options);
    console.log('pre then');
    promise.then(function(file) {
      console.log('in promise');
      //append code
      let $ = cheerio.load(file);


      console.log('getHtml()');
      // console.log(html);
      resolve(html);
    });
    promise.catch(function(e) {
      console.log(e);
      return null;
    });
    return promise;
  }



  module.exports = {
    writeFile(aComponent, uid, selected_repository) {
      var promise = new Promise(function(resolve, reject) {
        createFolder(path);
      }).then(function (){
        template = fs.readFileSync('./componentTemplate/responsive/index.html');
      }).then(function (){
        generateHtml();
      }).then(function (){
        fs.writeFileSync(path, html);
      }).catch(function(e) {
        console.log('an error has occurred: '+e);
        reject(e);
      });
      return promise;

      let html,
        htmlPath,
        jadePath,
        jadeContent,
        template,
        $;
      //create the folders, a promise is returned
      let promise = createFolders(aComponent, uid, selected_repository);
      promise.then(function(filePath) {
        // console.log('assign file path');
        htmlPath = filePath+'.html';
        jadePath = filePath+'.jade';
      }).then(function() {
        // console.log('read file');
        template = fs.readFileSync('./componentTemplate/responsive/index.html');
      }).then(function() {
        // console.log('load template into cheerio');
        $ = cheerio.load(template);
        html = $.html();
      }).then(function() {
        // console.log('append');
        html = appendComponent(aComponent, $);
        jadeContent = 'include ./'+aComponent.name+'-'+aComponent.cid+'.html';
        // console.log(html);
      }).then(function() {
        // console.log('write file');
        // console.log(htmlPath);
        // console.log(html);
        fs.writeFileSync(htmlPath, html);
        fs.writeFileSync(jadePath, jadeContent);
        resolve();
      });
      return promise;
      //get the html



      // let htmlFilePath = filePath+'.html';
      // let jadeFilePath = filePath+'.jade';
      //
      // let promise2 = promise.then(function(html) {
      //   //write the html component filePath
      //   fs.writeFile(htmlFilePath, html, (err => {
      //     // console.log('writing '+htmlFilePath+'\n'+html);
      //     // console.log('writing html file');
      //     if (err) throw err;
      //   }));
      //
      // }).then(function() {
      //   // console.log('writing jade file');
      //   //write the jade component filePath to include html file
      //   fs.writeFile(jadeFilePath, 'include '+aComponent.name+'.html', (err => {
      //     if (err) throw err;
      //   }));
      //
      // });
      // return promise2;


    }
  };

})();
