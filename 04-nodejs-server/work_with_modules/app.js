//Each file is treated as a separate module
const User = require('./ru');
const phrases = require('./db/index.js');
phrases.connect();

function run() {
    let vasya = new User("Vasya");
    let petya = new User("Petya");

    vasya.hello();
    console.log(phrases.getPhrase('Run successful'));
}
//In each module the 'module' variable is a reference to the object representing the current module
//module.exports object is created by the module system
if (module.parent) {
    module.exports.run = run;
    console.log('parent module');
}
else {
    run();
    console.log('native module');
}