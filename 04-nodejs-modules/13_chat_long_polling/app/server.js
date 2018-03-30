const http = require('http');
const fs = require('fs');
const path = require('path');
const logic = require('./logic');
//const clients = require('./clients.js');
//const publish = require('../')

var messages = [];
var clients = [];

http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            sendFile('index.html', res, 'text/html');
            break;
        case '/client.js':
            sendFile('client.js', res, 'text/javascript');
            break;
        
        case '/subscribe':
            logic.subscribe(req, res);
        break;
        case '/publish':
            logic.publish('...');
        break;
        default:
            res.statusCode = 404;
            res.end('Not found');
    }
}).listen(3000, 'localhost', () => {
    console.log('server running at http://localhost:3000');
});

function sendFile(file, res, contentType) {
    /**const pathext = path.extname(file);
    console.log('pathext: ', pathext);
    if (pathext == '.js') {
        contentType = 'text/javascript';
    }
    if (pathext =='.css') {
        contentType = 'text/css';
    }
    if (pathext == '.html') {
        contentType = 'text/html';
    }**/
    res.writeHead(200, { 'Content-Type': contentType });
    const fileStream = fs.createReadStream(file);
    fileStream.pipe(res);
    fileStream.on('error', (err) => {
        console.error(err);
        res.statusCode = 500;
        res.end('Server error');
        return;
    });
    res.on('close', () => {
        fileStream.destroy();
    });
}
//https://stackoverflow.com/questions/17478566/using-node-js-to-serve-up-basic-web-page-with-css-and-js-includes

//http://book.mixu.net/node/ch3.html
//https://stackoverflow.com/questions/28822034/simple-node-js-server-that-sends-htmlcss-as-response