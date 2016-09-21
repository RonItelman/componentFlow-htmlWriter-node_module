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
  let shell = require('shelljs');

  let file = {
    src: null, //the buffer source from fs.readFileSync
    path: null,
    fileName: null,
    boilerplate: null,
    $: null, //the JQuery object for the html page,
    html: null //the file's html
  };

  /**
  * @param path {String} the path of the folder which will be created if it does not exist
  **/
  function createFolder() {
    console.log('creating folder(s)');
    if (!fs.existsSync(file.path)) {
      shell.mkdir('-p', file.path);
      console.log('file.path created: '+fs.existsSync(file.path));
    }
  }

  /**
  * @param src {data} - the output from fs.readFileSync
  * @return $ - returns a JQuery object (Cheerio)
  **/
  function getJQueryObject() {
    console.log('getJQueryObject()');
    file.$ = cheerio.load(file.path+file.fileName);
  }

  /**
  * @param fileName {String} - output html file, i.e. 'myFile.html'
  * @param path {String} - '/myHtmlFiles/A_folder/'
  * @param boilerplate {String} - a boilerplate template to initialize myFile.html, i.e. 'html5boilerplate.html'
  * if boilerplate is null, no boilerplate will be used
  * @return src - if the output fileName exists, it will return the readFileSync output of the existing file, otherwise it will return the readFileSync output of the boilerplate
  **/
  function getSourceFile() {
    let promise = new Promise(function(resolve, reject) {
      if (!fs.existsSync(file.path+file.fileName) && file.boilerplate !== null) {
        file.src = fs.readFileSync(file.boilerplate);
      }
      else if (file.boilerplate !== null) {
        file.src = fs.readFileSync(file.path+file.fileName);
      }
      else {
        file.src = null;
      }
      resolve();
      return promise;
    });
  }

  function append(html) {
    console.log('append(html)');
    let body = $('body');
    body.append(html);
    file.html = $.html();
    resolve();
  }



  module.exports = {

    /**
    * Creates the folder path
    * Gets the boilerplate file if one is passed
    * @param fileName {String} - output html file, i.e. 'myFile.html'
    * @param path {String} - '/myHtmlFiles/A_folder/'
    * @param boilerplate {String} - a boilerplate template to initialize myFile.html, i.e. 'html5boilerplate.html'
    * if boilerplate is null, no boilerplate will be used
    */
    init(fileName, path, boilerplate) {

      //assign values to singleton
      file.fileName = fileName;
      file.path = path;
      file.boilerplate = boilerplate;

      var initPromise = new Promise(function(resolve, reject) {
        createFolder();
        resolve();
      }).then(function (){
        getSourceFile();
      });
      return initPromise;
    },
    append(html) {
      //create the folders, a promise is returned
      let appendPromise = new Promise(function(resolve, reject) {
        getJQueryObject();
      }).then(function() {
        append(html);
      }).then(function() {
        fs.writeFileSync(file.path+file.fileName, file.html);
        resolve();
      }).catch(function(e) {
        console.log('an error has occurred: '+e);
        reject(e);
      });
      return appendPromise;
    }
  };

})();
