// Create objects with their methods
const http = require('http');
/**The fs module provides an API for interacting with the file system in a manner 
 * closely modeled around standard POSIX functions. */
const fs = require('fs');
/** The url module provides utilities for URL resolution and parsing */
const url = require('url');
/** The path module provides utilities for working with file nd directory paths. */
const path = require('path');

const server = http.createServer(requestHandler);

/** It is available in all modules. The __dirname variable may appear to be global but is not. It exists only in the scope of modules.
 * It is a directory name of the current module. The same as the path.dirname() of 
 * the __filename.
 */
const PATHNAME = __dirname + '/public';
//const PATHNAME = path.dirname('../view');

function requestHandler(req, res) {
    /**
     * The url.parse() method takes a URL string, parses it, and returns a URL object.
     */
    const pathname = url.parse(req.url, true);
    if (!checkAccess(pathname)) {
        res.statusCode = 403;
        res.end("No access");
        return;
    }
    sendFileSafe(pathname, res);
    
}
function checkAccess(pathname, res) {
    return pathname.query.secret === 'O';
}

function sendFileSafe(pathname, res) {
    try {
        /**
         * The decodeURIComponent() method decodes a Uniform Resource Identifier 
         * (URI) component previously created by encodeURIComponent or by a similar routine.
         */
        var filePath = decodeURIComponent(pathname.pathname);
    }
    catch(e) {
        res.statusCode = 400;
        res.end(e);
        return;
    }
    if (~filePath.indexOf('%00')) {
        console.log('fuck');
        res.statusCode = 400;
        res.end('Bad request');
        return;
    }
    filePath = path.join(PATHNAME + filePath);   
    if (filePath.indexOf(PATHNAME) != 0 ) {
        res.statusCode = 404;
        res.end('Page not found');
        return;
    }
    fs.stat(filePath, (err, doc) => {
        if (err || !doc.isFile()) {
            res.statusCode = 404;
            res.end('Page not found');
            return;
        }
        sendFile();
    });
    function sendFile() {
        res.writeHead(200, {"Content-Type": "text/html"});
            //res.write(doc);
        const readFile = fs.createReadStream(filePath)
        readFile.pipe(res);
        readFile.on('error', function(err) {
            res.statusCode=500;
            res.end('Server Error');
            console.error(err);});
        return;
    }
}


server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on port 3000');
});