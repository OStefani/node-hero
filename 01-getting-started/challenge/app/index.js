//const logic = require('./logic.js');
//The readline module provides an interface for reading data from a Readable stream (such as process.stdin) one line at a time
const readline = require('readline');

rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});


console.log(rl);
module.exports.rl = rl;