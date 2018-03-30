const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 3000;

const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true);
    console.log(query.pathname);
    if (query.pathname === '/index.html') {
        const readFiles = fs.createReadStream('./view/index.html', 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        sendFile(readFiles, res);
    }
    else if (query.pathname === '/linux.html') {
        const readFiles = fs.createReadStream('./view/linux.html', 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        sendFile(readFiles, res);
    }
    else if (query.pathname === '/favicon.ico') {
        const readFiles = fs.createReadStream('./view/favicon.ico', 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        sendFile(readFiles, res);
    }
    else if (query.pathname === '/pexels-photo.jpeg') {
        const readFiles = fs.createReadStream('./view/pexels-photo.jpeg');
        res.writeHead(200, {'Content-Type': 'jpg/JPEG'});
        sendFile(readFiles, res);
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('Not Found');
    }
    //readFiles.pipe(res);
}).listen(port, () => {
    console.log(`Server is running on ${port}`);
});
function sendFile(file, res) {
    
    file.pipe(res);
    //file.pipe(process.stdout);
    file.on('error', function(err) {
        res.statusCode=500;
        res.end('Server Error');
        console.error(err);
    });
    file.on('open', function() {
        console.log('open');
        console.log(`memory: ${process.memoryUsage().heapUsed}`);
    });
    file.on('close', function() {
        console.log('close');
    });
    //сигнал о том, что соединение было оборвано
    //объект ответа сервер.рес имеет "close" это расширение стандартного интефейса потоков
    res.on('close', function() {
        //если соединение было оборвано, вызываем метод потока file.destroy, чтобы закрыть файл и освободить память
        file.destroy();
    });
    }
