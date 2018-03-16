const http = require('http');
const url = require('url');
const util = require('util');
const port = 3000;
const host = 'localhost';

let requestListener = function(req, res) {
    //req is incomingMessage
    /** An IncomingMessage object is created by http.Server or http.
     * ClientRequest and passed as the first argument to the 'request' 
     * and 'response' event respectively. It may be used to access response 
     * status, headers and data. It inherits from streams.
    It implements the Readable Stream interface. */
    console.log(req.method, req.url);
    //to create an object using url.parse we should add true to the end
    let urlParsed = url.parse(req.url, true);
    console.log(`url parsed ${util.inspect(urlParsed)}`);
    if (urlParsed.pathname === "/echo" && urlParsed.query.message === "hello") 
    {   // res is ServerREsponse
        /** This object is created internally by an HTTP server--not by the user. 
         * It is passed as the second parameter to the 'request' event.

        The response implements, but does not inherit from, the Writable Stream 
        interface. This is an EventEmitter */
        res.end(`${urlParsed.query.message}`);
    }
    else {
        res.statusCode = 404;
        res.end(' Page not found');
    }
};
/** In fact, the Server object returned by createServer is an EventEmitter */
const server = http.createServer(requestListener);

server.listen(port, host, function() {
    console.log(`Server is running on http://${host}:${port}`)
})