const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.statusCode = 404;
    res.end("Hello headers");
});
server.listen(3000, 'localhost', function() {
    console.log("Server running");
})