/** EventEmitter class lies in the events module */
const events = require('events');
// Create an instance of the EE
var db = new events.EventEmitter();
//console.log('db: ', db);

function Req() {
    const self = this;
    this.bigdata = new Array(1e6).join('*');
    function sendData(info) {
        self.send(info);
    }
    /** All the events listeners functions are stores in the _events property in the db object. Every Req which is created stores the event listener function in the object, hence to avoid the memory leaks we should to remove the handler if it exists. */
    this.end = function () {
        db.removeListener('request', sendData);
    }

    db.on('request', sendData);

}

setInterval(function() {
    let req = new Req();
    console.log('db: ', db);
    req.end();
    /**The memoryUsage method returns an object describing the memory usage of the Node.js process measured in bytes.**/
    /**heapTotal and heapUsed refer to V8's memory usage. external refers to the memory usage of C++ objects bound to JavaScript objects managed by V8. rss, Resident Set Size, is the amount of space occupied in the main memory device (that is a subset of the total allocated memory) for the process, which includes the heap, code segment and stack.**/
    /**The heap is where objects, strings, and closures are stored. Variables are stored in the stack and the actual JavaScript code resides in the code segment.**/
    console.log(process.memoryUsage().heapUsed);
}, 200);