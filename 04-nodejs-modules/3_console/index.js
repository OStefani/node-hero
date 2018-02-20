//The console module provides  simple debugging console. The module exports: 
//A Console class with methods such as console.log(), console.error() and console.warn() that can be used to write to any Node.js stream.
//A global console instance configured to write to process.stdout and process.stderr. It can be used without calling require('console').
//console.log() Prints to stdout with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
//выводит в обычный поток
const count = 5;
console.log('count: %d', count);
//console.error() Prints to stderr with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf(3) (the arguments are all passed to util.format()).
//выводит в поток ошибок
const code = 5;
console.error('error #%d', code);