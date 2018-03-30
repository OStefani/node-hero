const fs = require('fs');
const http = require('http');

http.createServer((req, res)=> {
    const fileStream = fs.createReadStream('../view/about.html');
    res.writeHead(200);
    /**The same as fileStream.pipe(res) */
    fileStream.on('readable', () => {
        let chunk;
        while((chunk = fileStream.read()) !== null) {
            res.write(chunk.toString());
        }
    });
    fileStream.on('end', () => {
        return res.end();
    });
    /** */

}).listen(8000, ()=> {
    console.log(`Server is running at http://localhost:${8000}`);
});