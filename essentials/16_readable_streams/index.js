const fs = require('fs');
const stream = fs.createReadStream('./chat.log', 'UTF-8');
var data = ''; 

stream.once('data', (chunk) => {
     console.log('Started reading the file \n');
})
stream.on('data', (chunk) => {
    process.stdout.write(`chunk: ${chunk.length}`);
    data += chunk;
});
stream.on("end", function() {
	console.log("\n");
	console.log(`Finished Reading File ${data.length}`);
	console.log("\n");
});