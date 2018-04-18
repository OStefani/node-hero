const fs = require('fs');


if (fs.existsSync('lib')) {
    console.log('It exists');
}
else {
    //console.log(fs.statSync('./lib'));
    fs.mkdir('./lib', (err)=> {
    if (err) throw err;
    console.log('Directory created');
});
}