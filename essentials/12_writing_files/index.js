const readline = require('readline');
const fs = require('fs');

rl = readline.createInterface(process.stdin, process.stdout);

const realPerson = {
    name: '',
    saying: []
};

rl.question('What is your name? ', (name) => {
    realPerson.name = name;
    // create a new markdown file
    // as the app has 1 user, we use sync operation
    fs.writeFileSync(realPerson.name + '.md', `${realPerson.name}\n==================\n\n`);
    console.log(`What would ${realPerson.name} say? \n`)
    rl.on('line', (data) => {
        if (data.toLowerCase().trim() === 'exit') rl.close();
        realPerson.saying.push(data);
        // append saying to the markdown file
        /**Asynchronously append data to a file, creating the file if it does not yet 
         * exist. data can be a string or a Buffer.*/
        fs.appendFileSync(realPerson.name + ".md", `* ${data.trim()} \n`);
        rl.prompt(true);
        console.log('What else? \n');
    });
});

rl.on('close', () => {
    console.log("%s is a real person that says %j", realPerson.name, realPerson.saying);
    process.exit();
});