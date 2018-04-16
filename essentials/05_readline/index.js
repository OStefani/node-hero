// The readline module provides an interface for reading data from a Readable stream (such as 
// process.stdin) one line at a time. It is a wraper around stdin and stdout

const readline = require('readline');

// 1. Create an instance of the readline object
const rl = readline.createInterface(process.stdin, process.stdout);

var realPerson = {
    name: '',
    sayings: []
}
// 2. display a query by writing it to the output, waits for user input to be provided on input, then invokes the callback function passing the provided input as the first argument.
rl.question('What is the name of a real person? ', (result) => {
    realPerson.name = result;
    // 3. set the prompt that will be written to output whenever rl.prompt() is called.
    rl.setPrompt(`What would ${realPerson.name} say? `);
    // 4. The rl.prompt() method writes the readline.Interface instances configured prompt to a new line in output in order to provide a user with a new location at which to provide input.
    rl.prompt();
    // 5. The 'line' event is emitted whenever the input stream receives an end-of-line input (\n, \r, or \r\n). This usually occurs when the user presses the <Enter>, or <Return> keys.
    rl.on('line', (saying) => {
        if (saying.toLowerCase().trim() === 'exit') {
            // The rl.close() method closes the readline.Interface instance and relinquishes // control over the input and output streams. When called, the 'close' event will // be emitted.
            rl.close();
        }
        realPerson.sayings.push(saying.trim());
        // 6. change the prompt & continue to ask againe the same question
        rl.setPrompt(`What else would ${realPerson.name} say? ('exit' to leave) `);
        rl.prompt();
        
    });
    rl.on('close', () => {
        console.log("%s is a real person that says %j", realPerson.name, realPerson.sayings);
        // The process.exit() method instructs Node.js to terminate the process synchronously with an exit status of code
        process.exit(0);
    });

});