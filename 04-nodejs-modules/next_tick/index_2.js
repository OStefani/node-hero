const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hi');
    //setTimout не гарантирует, что асинхронный код будет выполнен до того, как прийдет следующий //запрос
    //setTimeout(() => {}, 0);
    process.nextTick(() => {
        req.on('readable', function() {
            console.log(`Second - nextTick`);
            //должен сработать сразу после выполнения js (на ближайщих данных)
        });
    });
    setImmediate(() => {
        console.log(`Third - immediate`);
    });
    console.log(`First - JS`);
}).listen(3000);