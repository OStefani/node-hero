// EventEmitter allows to create listeners for any emited custom events
/**const events = require('events');

// EventEmitter is a constructor
// create a new instance of the emitter
var emitter = new events.EventEmitter();

emitter.on('customEvent', (message, status) => {
    console.log(`${message}: ${status}`)
});

emitter.emit('customEvent', 'Hello World', 200);**/
// let's maka a Person to inherit the EventEmitter
//set the  variable to the constructor function
const EventEmitter = require('events').EventEmitter;
const util = require('util');

var Person = function(name) {
    this.name = name;
}
// create an instance of the emmiter
// add EventEmitter to Person's prototype
/** It is possible to use the ES6 class and extends keywords to get language level inheritance support */
util.inherits(Person, EventEmitter);

var ben = new Person('Ben Franklin');

ben.on('speak', function(said) {
    // the callback 'knows' that this is the curent instance of the object
    console.log(`${this.name} said: ${said}`);
});
ben.emit('speak', 'You may dealay, but time will not');

