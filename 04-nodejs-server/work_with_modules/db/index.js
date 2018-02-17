//const connection = require('./ru.json');
//console.log('connection', connection);
let connection;
module.exports.connect = function() {
    connection = require('./ru.json');
}

module.exports.getPhrase = function(name) {
    if(!connection[name]) {
        return new Error('Invalid phrase');
    }
    return connection[name];
}