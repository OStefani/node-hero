// to make a request to a sequire server
const https = require('https');
const fs = require('fs');
// options can be an object, a string, or a URL object. If options is a string, it is 
// automatically parsed with url.parse(). If it is a URL object, it will be automatically 
// converted to an ordinary options object.
options = {
    hostname: 'en.wikipedia.org',
    port: 443,
    path: '/wiki/George_Washington',
    method: 'GET'
};
//  allows one to transparently issue requests
var req = https.request(options, (res) => {
    var resBody = '';
    console.log('Response from server started');
    console.log(`Server status: ${res.statusCode}`);
    console.log("Response Headers: %j", res.headers);
    res.setEncoding("UTF-8");

	res.once("data", function(chunk) {
		console.log(chunk);
	});

	res.on("data", function(chunk) {
		console.log(`--chunk-- ${chunk.length}`);
		resBody += chunk;
	});

	res.on("end", function() {
		fs.writeFile("george-washington.html", resBody, function(err) {
			if (err) {
				throw err;
			}
			console.log("File Downloaded");
		});
	});
});

req.on("error", function(err) {
	console.log(`problem with request: ${err.message}`);
});

req.end();