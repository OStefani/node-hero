const fs = require('fs');

console.log('start reading files...');

    //readFile.Sync synchronously returns the contents of the path.
    //returns a string if encoding option is specifyed otherwise returns a buffer
/**fs.readFile('./app/index.txt', 'utf-8', function(err, data) {
    if (err) {
        return console.log(err.message);
    }
    return console.log(`${data} \n End of the file`);
});**/
function readFiles(file, enc) {
    return new Promise(function(resolve, reject) {
        fs.readFile(file, enc, function (err, data) {
            if (err) return reject(err); 
            return resolve(data + `\n\n`);
        });
    }
    )}

Promise.all([readFiles('./app/index.txt', 'utf-8'), readFiles('./app/index2.txt', 'utf-8'), readFiles('./app/index3.txt', 'utf-8')])
.then((data) => console.log(`${data} \n End of the files`))
.catch((err) => console.log(err.message));
