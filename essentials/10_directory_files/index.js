const fs = require('fs');
fs.readdir('./lib', (err, data)=> {
    if (err) throw err;
    console.log(data);
});
console.log("Reading Files...");
