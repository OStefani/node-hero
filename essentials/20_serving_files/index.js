var http = require("http");
var fs = require("fs");
var path = require("path");
//const url = require('url');

http.createServer(function(req, res) {

	console.log(`${req.method} request for ${req.url}`);

	if (req.url === "/") {
		fs.readFile("./public/index.html", "UTF-8", function(err, html) {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.end(html);
		});

    } 
    // Another way to handle req.url is to use a regular expression instead of         
    // console.log(url.parse(req.url, true));
    else if (req.url.match(/.css$/)) {
        const cssPath = './public' + req.url;
        //var cssPath = path.join(__dirname, 'public', req.url);
		var fileStream = fs.createReadStream(cssPath, "UTF-8");
		res.writeHead(200, {"Content-Type": "text/css"});
		fileStream.pipe(res);
    }
    else if (req.url.match(/.jpg$/)) {
        /**The path.join() method joins all given path segments together using the 
         * platform specific separator as a delimiter, then normalizes the resulting 
         * path.
         * Zero-length path segments are ignored. If the joined path string is a 
         * zero-length string then '.' will be returned, representing the current working directory. */
		var imgPath = path.join(__dirname, 'public', req.url);
		var imgStream = fs.createReadStream(imgPath);
		res.writeHead(200, {"Content-Type": "image/jpeg"});
		imgStream.pipe(res);
	}
    else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }

}).listen(3000);


console.log("File server running on port 3000");
