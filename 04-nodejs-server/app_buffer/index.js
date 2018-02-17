const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 3000;

const requestHandler = (req, res) => {
    const path = url.parse(req.url, true);
    let searchForFile = './view' + path.pathname;
    console.log(searchForFile);
    fs.readFile(searchForFile, 'utf-8', (err, data) =>{
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        //console.log(req.url);
        //console.log(req.method);
        //console.log(req.headers);
        res.write(data);
        fs.appendFile('./app/index2.txt', 'Hello Content!', (err) => {
            if (err) throw err;
            console.log('Saved');
        })
        return res.end();
    });
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) return err.message;
    console.log(`server is listening on ${port}`);
});