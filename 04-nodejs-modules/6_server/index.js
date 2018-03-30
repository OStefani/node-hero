//Create a new object module and serve it without updating
/**In the Node.js module system, each file is treated as a separate module */
const http = require('http');
const util = require('util');
// Create an instance of the Server class
/**
 * Server is an event emmitter. It emmits 'request' event when an incoming request is occured
 */
const server = new http.Server();
//console.log(`Server: ${util.inspect(server)}`);
//console.log(`${server.eventNames()}`);
server.listen(3000, '127.0.0.1', function() {
    console.log("hello server");
    console.log(`keepAliveTimeout ${this.keepAliveTimeout}`);
    console.log(`requestListener ${this.requestListener}`)
});
let counter = 0;

// To look at events redefine emit() method
const emit = server.emit;
//console.log(`emit ${emit}`);
server.emit = function(event) {
    console.log(event); //listening, hello server, keepAliveTimeout 5000, connection, request, request, timeout
    /**connection starts when a browser open a new net connection 
     * and request sends a request. Keep-alive is set in _http_server.js */
    /**The apply() method calls a function with a given this value, and arguments 
     * provided as an array */
    /**The difference is that apply lets you invoke the function with arguments as 
     * an array; call requires the parameters be listed explicitly. A useful mnemonic 
     * is "A for array and C for comma." */
    emit.apply(this, arguments);
}
server.on('request', function (req, res) {
    // To add and then to log
    res.end("starting..." + ++counter);
});
//console.log(`${server.eventNames()}`);