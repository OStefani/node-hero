const express = require('express');

//create an instance of express
const app = express();
//define endpoints
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
})

app.listen(3000);