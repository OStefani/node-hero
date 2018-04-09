const express = require('express');
const app = express();
const logger = require('./logger');

/**
 * Middleware functions are functions that have access to the request object (req), 
 * the response object (res), and the next middleware function in the application’s
 * request-response cycle. 
 */
app.use(logger);
app.use(express.static('public'));

app.get('/blocks', (req, res) => {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    res.json(blocks);
    // or res.send(blocks);
    /** The send function converts  arays and objects into json format and strings will be send as is. */
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Server running at http://localhost:3000');
});