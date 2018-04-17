const fs = require('fs');
var path = require("path");


fs.readFile('./lib/sayings.md', 'UTF-8', (err, data) => {
    if(err) console.log(err);
    console.log(data);

});

fs.readdir("./lib", function(err, files) {

	files.forEach(function(fileName) {
        // create a full path to the file
		var file = path.join(__dirname, "lib", fileName);
		var stats = fs.statSync(file);
		if(stats.isFile() && fileName !== ".DS_Store") {
			fs.readFile(file, "UTF-8", function(err, contents) {
				console.log(contents);
			});
		}
	});
});