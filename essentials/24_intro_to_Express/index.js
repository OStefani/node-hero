const express = require('express');

var app = express();

// add a custom middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
})

app.use(express.static('./public'));

app.listen(3000);