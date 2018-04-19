const fs = require('fs');

fs.renameSync("./lib/project-config.js", "./lib/config.json");
console.log("Config json file renamed");

/**Asynchronously rename file at oldPath to the pathname provided as newPath. 
 * In the case that newPath already exists, it will be overwritten. 
 * No arguments other than a possible exception are given to the completion callback. */
fs.rename("./lib/notes.md", "./notes.md", function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Notes.md moved successfully");
	}
});