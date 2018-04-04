const fs = require('fs');

const file = fs.createReadStream('pic.jpg');
// Returns a new WriteStream object.
const newFile = fs.createWriteStream('newfile.jpg');
var uploaded = 0;

file.pipe(newFile);

fs.stat('pic.jpg', (err, stats) => {
    if (err) throw err;
    // A size of the file
    const size = stats["size"];
    console.log('size: ', size);

    file.on('readable', () => {
        //if readable - read to Buffer
        let chunk = file.read();
        //console.log('chunk: ', chunk.length);
        if (chunk != null) {
            console.log('chunk: ', chunk.length);
            //count uploaded size
            uploaded = uploaded + chunk.length;
            console.log('Uploaded: ' + parseInt(uploaded/size*100) + ' %');
        }
    });
    file.on('end', () => {
        console.log('Completed!');
    });
    
    newFile.on('finish', () => {
        console.log('finish');
    })
});

//file.pipe(newFile);