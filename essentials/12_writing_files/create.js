var fs = require("fs");

var md = `

Sample Markdown Title
=====================

Sample subtitle
----------------

* point
* point
* point

`;
/**Asynchronously writes data to a file, replacing the file if it already exists. 
 * data can be a string or a buffer. */
// name of the file, the content and the calback function with err argument
fs.writeFile("sample.md", md.trim(), function(err) {
	if (err) console.log(err);
	console.log("File Created");

});