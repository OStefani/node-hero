
//The readline module provides an interface for reading data from a Readable stream (such as //process.stdin) one line at a time
const readline = require('readline');

rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});
//console.log('rl: ', rl);
rl.question('Enter the first number: ', (num1) => {
    rl.question('Enter the second number ', (num2) => {
        console.log(`A sum of two numbers: ${Number(num1)+Number(num2)}`);
        rl.close();
    });
})