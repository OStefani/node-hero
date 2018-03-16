const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hi');
}).listen(3000);

server.on('close', () => {
    console.log('Process finshed with exit code 0');
})
const timer = setInterval(() => {
    console.log(process.memoryUsage());
}, 1000);

//пока есть активный таймер libUV не может завершить процесс
setTimeout(() => {
    server.close();
    /**
     * server.close(() => {
     *  clearInterval(timer);
     * })
     */
}, 2500);
//timer в отличие от бразерного js, это объект, unref() указывает libUV, что таймер второстепенен, его не следует учитывать при проверке внутренних вотчеров при завершении процесса
timer.unref();