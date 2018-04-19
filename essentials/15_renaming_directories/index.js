const fs = require('fs');
//we can rename, move direcories using fs.rename()
fs.renameSync('./assets/logs', './logs');
console.log("Directory moved");

// we can remove only empty directories

// list all files
let files = fs.readdirSync('./logs');

files.forEach((fileName) => {
    fs.unlinkSync('./logs/' + fileName);
});

fs.rmdir('./logs', (err) => {
    if (err) throw err;
    console.log("The directory removed.");
});