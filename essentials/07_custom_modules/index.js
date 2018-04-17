//Each file is treated as a separate module
const EventEmitter = require('events').EventEmitter;
const util = require('util');

var Person = function(name) {
    this.name = name;
};

util.inherits(Person, EventEmitter);

//In each module the 'module' variable is a reference to the object representing the current module
//module.exports object is created by the module system; exports is a reference to the module.exports that is shorter to type.
module.exports = Person;