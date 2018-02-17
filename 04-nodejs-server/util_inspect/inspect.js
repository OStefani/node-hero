const util = require('util');

const obj = {
    a: 5,
    b: 3,
    check: function() {
        return 123;
    }
};
//Returns a string representation of object that is primaraly useful for debugging
console.log(util.inspect(obj));
//Returns a formated string using the first arguments as a printf-like format
const str = util.format("My %s %d %j", "string", 123, {test: "test"});
console.log(str);