/**Most fs operations accept filepaths that may be specified in the form of a string, 
 * a Buffer, or a URL object using the file: protocol. 
 * String form paths are interpreted as UTF-8 character sequences identifying the 
 * absolute or relative filename. */
var fs = require("fs");

try {
	fs.unlinkSync("./lib/config.json");
} catch (err) {
	console.log(err);
}
/**Asynchronously removes a file or symbolic link. No arguments other than a 
 * possible exception are given to the completion callback.*/
fs.unlink("notes.md", function(err) {

	if (err) {
		console.log(err);
	} else {
		console.log("Notes.md removed");
	}

});
