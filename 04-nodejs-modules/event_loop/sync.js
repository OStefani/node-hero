const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    let info = 0;
    if (req.url === '/') {
        info = fs.readFileSync('../view/linux.html');
        res.end(info);
    }
    else if (req.url === '/now') {
        res.end(new Date().toString());
    }
}).listen(3000);