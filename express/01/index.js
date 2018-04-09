const express = require('express');

//create an instance of express
const app = express();
//define endpoints
// the callback will run each time the app receive a get request to the root path
app.get('/', (req, res) => {
    /**NOTE req and res inherit from node.js IncomingMessage and http.ServerResponse
     * Hence it is possible to call node.js function inside express apps. */
    res.sendFile(__dirname + '/index.html');
});
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
})

app.listen(3000);