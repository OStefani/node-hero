const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.end('Hi');
    fs.open('../view/index.html', 'r', (err, file) => {
        if (err) throw err;
        console.log(`Opened!`);
    });
    process.nextTick(() => {
        //req.on('readable', function() {
            console.log(`Second - nextTick`);
            //должен сработать сразу после выполнения js (на ближайщих данных)
        //});
    });
    //setTimout не гарантирует, что асинхронный код будет выполнен до того, как прийдет следующий //запрос
    //setTimeout(() => {}, 0);
    setTimeout(() => {
        console.log(`Forth - settimout?`);
    }, 0);

    //позволяе вызывать код ассинхронно и не тормозить событийный цикл
    //выставляет в очередь сразу после колбеков событий ввода-вывода
    /**
     * callbacks for some system operations such as types 
     * of TCP errors. For example if a TCP socket receives ECONNREFUSED when attempting
     * to connect, some *nix systems want to wait to report the error. This will 
     * be queued to execute in the I/O callbacks phase.
     */
    setImmediate(() => {
        console.log(`Third - immediate`);
    });
    console.log(`First - JS`);
}).listen(3000);