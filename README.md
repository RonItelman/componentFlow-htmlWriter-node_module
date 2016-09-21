# htmlWriter
This micro module creates and returns a Promise object after creating a folder if it doesn't exists, creating an html doc and then inserting content using Cheerio.

Steps:
* Checks if a path to a folder exists, and if not, creates one.
* Uses Cheerio to load an html boilerplate and append content.
* Writes the file
* Returns a promise that's resolved if successful, or returns a rejected promise if an error was thrown.

Template engine is Jade.

# Usage
### Please make sure you are using Node 6.2.2
### Requires a shell scripting environment is installed (bash, etc)

npm install htmlWriter-node_module


the module is located at /modules/htmlWriter.js

    let htmlWriter = require('htmlWriter');

    // sets the filename, creates the folder, loads an html boilerplate
    // if the file already exists this will be ignored
    // if no boilerplate is to be used pass null for boilerplate
    htmlWriter.init('filename.html', 'path', 'boilerplate.html');

    // appends html to body and writes file if it didn't already exist
    htmlWriter.append(html);

# Dependencies

* [cheerio](https://www.npmjs.com/package/cheerio) - Tiny, fast, and elegant implementation of core jQuery designed specifically for the server
* [moment](https://www.npmjs.com/package/moment) - I create a timestamp in my example when I append
* [nodemon](https://www.npmjs.com/package/nodemon) - Simple monitor script for use during development of a node.js app.
* [gulp](https://www.npmjs.com/package/gulp) - a streaming build system
* [browser-sync](https://www.npmjs.com/package/browser-sync) - Live CSS Reload &amp; Browser Syncing
* [run-sequence](https://www.npmjs.com/package/run-sequence) - Run a series of dependent gulp tasks in order
* [shelljs](https://www.npmjs.com/package/shelljs) - Portable Unix shell commands for Node.js
