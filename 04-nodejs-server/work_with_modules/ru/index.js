const phrases = require('../db/index.js');
//phrases.connect();
const logger = require('../logger.js');

function User(name) {
    this.name = name;
}
User.prototype.hello = function() {
    logger(module);
    console.log(`${phrases.getPhrase("Hello")} ${this.name}`);
}

//console.log(module);
module.exports = User;
