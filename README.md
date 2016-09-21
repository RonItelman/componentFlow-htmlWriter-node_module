# htmlWriter
This micro module creates and returns a Promise object after creating a folder if it doesn't exists, creating an html doc and then inserting content using Cheerio.

# Usage
###Please make sure you are using Node 6.2.2

 This micro module creates and returns a Promise object after creating a folder if it doesn't exists, creating an html doc and then inserting
 content using Cheerio.
 Steps:
 1. Checks if a path to a folder exists, and if not, creates one.
 2. Uses Cheerio to load an html boilerplate and append content.
 3. Writes the file
 4. Returns a promise that's resolved if successful, or returns a rejected promise if an error was thrown.
 Usage:
 let htmlWriter = require('htmlWriter');
 htmlWriter.init('my_path'); // creates the folder, loads the html boilerplate
 htmlWriter.append(content); // appends content and writes file
