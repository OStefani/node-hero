var path = require('path');
/** The util module is primarily designed to support the needs of Node.js' own
 * internal APIs. */
var util = require('util');
/** The v8 module exposes APIs that are specific to the version of V8 built into the
 * Node.js binary. */
var v8 = require('v8');


console.log(path.basename(__filename));

var dirUploads = path.join(__dirname, 'www', 'files', 'uploads');
//adds date and time stamps
// deprecated 
util.log(dirUploads);

const obj = {
    length: 40,
    width: 30,
    square: function() {
        return 123;
    }
};
console.log(util.inspect(obj));
//Returns a formated string using the first arguments as a printf-like format
const str = util.format("My %s %d %j", "string", 123, {test: "test"});
console.log(str);
// returns an object
util.log(v8.getHeapStatistics());
//The memoryUsage method returns an object describing the memory usage of 
//the Node.js process measured in bytes
/**heapTotal and heapUsed refer to V8's memory usage. external refers to 
     * the memory usage of C++ objects bound to JavaScript objects managed by V8. 
     * rss, Resident Set Size, is the amount of space occupied in the main memory 
     * device (that is a subset of the total allocated memory) for the process, 
     * which includes the heap, code segment and stack.
**/
//The heap is where objects, strings, and closures are stored. Variables are stored in //the stack and the actual JavaScript code resides in the code segment.
console.log(process.memoryUsage());