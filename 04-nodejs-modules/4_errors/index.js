// Наследование от Error

var util = require('util');

var phrases = {
  "Hello": "Привет",
  "world": "мир"
};

function PhraseError(message) {
    this.message = message;
    this.name = "PhraseError";
    Error.captureStackTrace(this, PhraseError);

}
PhraseError.prototype = Object.create(Error.prototype);

function HTTPError(message) {
    Error.call(this, message);
    this.message = message;
    this.name = "HTTPError";
    //Creates a stack property on a target object (this) which when accessed returns  string //representing the location of the code at which Error.captureStackTrace() was called.
    // Without passing HTTPError to captureStackTrace, the HTTPError
    // frame would show up in the .stack property. By passing
    // the constructor, we omit that frame, and retain all frames below it.
    Error.captureStackTrace(this, HTTPError);
}
HTTPError.prototype = Object.create(Error.prototype);

function getPhrase(name) {
    if (!phrases[name]) {
        /**By default, Error instances are given the name "Error". 
         * The name property, in addition to the message property, is used by 
         * the Error.prototype.toString() method to create a string representation 
         * of the error.* */
        /**const err = new Error("Нет такой фразы: ", name);
        err.name = "PraseError";**/
      throw new PhraseError(`Нет такой фразы ${name}`);
    }
    return phrases[name];
  }
  
  
  function makePage(url) {
  
    if (url != 'index.html') {
        /**const err = new Error("Нет такой страницы", url);
        err.name = "HTTPError";**/
      throw new HTTPError("Нет такой страницы");
    }
  
    return util.format("%s, %s!", getPhrase("Hello"), getPhrase("world"));
  }

try {
    var page = makePage('inde.html');
    console.log(page);
}
catch(err) {
    //The errror.stack represents the point in the code in which new Error was called
    console.log(err.stack);
}