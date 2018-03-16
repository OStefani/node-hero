/**
 * 1. Add modules
 */
const http = require('http');
const fs =require('fs');
var count = 0;
/**
 * 2. Create an object
 * 3. Register a handler for the 'request' event that will be called when request arrives to '/view/linux.html' (Hang handler)
 */
/**
 * 5.1 Upon incoming request, event fires, Node.js calls the provided callback.
 * requestHandler is pushed to the stack.
 */
const server = http.createServer(requestHandler);
/**
 * 
 */
function requestHandler(req, res) {
    /**
     * 5.2 If url, libUV read the file. Because there is a watcher, proccess will not end till the file will be read or an error will be thrown.
     */
    if(req.url === '/view/linux.html') {
        count = count+1;
        console.log(`Handling request ${count}`);
        //res.writeHead(200, {'Content-Type': 'text/html'});
        //res.write('Handling request');
        /**
         * 5.3 fs.readFile is pushed to the stack, a handler is set to the 'end' event
         */
        fs.readFile('../view/linux.html', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                return res.end("Server error");
            }
            /**
             * 5.5 log 'Sending response'
             */
            console.log(`Sending response`);
            /**
             * 5.6 fs.readFile returns with data and popped from the stack
             */
            
            return res.write(`${data}`);
             
        });
        /**
         * 5.4 Log `Right path
         */
        console.log(`Right path`);
    }
    else {
        res.statusCode = 404;
        return res.end("Hello event loop, no other data here");
    }
    
}
/**
 * 4. Start listening on port 3000 
 * Listen is a method to work with net connection.
 * https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/
 * https://blog.risingstack.com/concurrency-and-parallelism-understanding-i-o/
 * It calls some code on C++ TCPWrap::Listen(...), which call LibUV on C uv_listen(...)
 * which hang inner handler(watcher) on the port ( sistem listen(...)) and reports up to chain about listening event. There is the end of the file and libUV cheks if there are any inner listeners
 * (watchers) there?
 * If there aren't the end of the program. If they are, the proccess will sleep till an event 
 * occure.
 * When a new connection to the port will 
 * ocure, operating system will sign about it, a watcher will call an inner callbeck, the callback 
 * pass an information to libUV, libUV pass it to Node.js, Node.js generate a 'connection' event
 * and parse the passed information. If duaring parsing will be determine that this is a
 * http request, a 'request' event will be thrown.
 */
server.listen(3000, 'localhost', () => {
    console.log(`Server running on http://localhost:3000`);
});
/**
 * To prevent event loop starvation large counting should be handling
 * in separete proccess or separete thread or devide a havy task into several parts using timeout()
 */