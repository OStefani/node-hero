const fs = require('fs');

const file = fs.createReadStream('../view/linux.html');
/**
* Returns a new WriteStream object.
*/
const newFile = fs.createWriteStream('newfile.html');
var uploaded = 0;

fs.stat('../view/linux.html', (err, stats) => {
    const size = stats["size"];
    console.log(size);

    file.on('readable', () => {
        let chunk = file.read();
        if (chunk != null) {
            uploaded = uploaded + chunk.length;
            console.log('upl: ', uploaded);
            console.log('Uploaded: ' + parseInt(uploaded/size*100) + ' %');
            chunk = file.read();
        }
    });
    file.on('end', () => {
        console.log('Completed!');
    })
});

file.pipe(newFile);