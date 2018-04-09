/**
 *1. A server part of Socket.io is integrated with the Node.js HTTP Server
 */
const express = require('express');
const app = express();
/**
 * creating an HTTP server yourself, instead of having Express create one for you is 
 * useful if you want to reuse the HTTP server, for example to run socket.io within the
 * same HTTP server instance.
 * However, app.listen() also returns the HTTP(!not HTTPS!) server instance, so with a bit of
 *rewriting *you can achieve something similar without creating an HTTP server yourself
 */
//3. Express initializes app to be a function handler that you can supply to an HTTP server
const server = require('http').createServer(app);
// 4. Initializing a new instance of socket io by passing a http object
const io = require('socket.io')(server);

var messages = [];
var storeMessage = function(name, data) {
    messages.push({name: name, data: data});
    if (messages.length > 10) {
        messages.shift();
    }
}
io.on('connection', function(client) {
    //call join to subscribe the socket to a given channel
    client.on('join', (name) => {
        messages.forEach((message) => {
            client.emit('messages', message.name + ': ' + message.data);
        })
        client.nickname = name;
    })
    console.log('client connected');
    //client.emit('messages', {hello: 'world'});
    //9. On messages event execute the callback
    client.on('messages', function(data) {
        //console.log(data);
        var nickname = client.nickname;
        // broadcast flag is for sending a message to everyone except for a certain socket.
        client.broadcast.emit('messages', nickname + ': ' + data);
        client.emit('messages',  nickname + ': ' + data);
        storeMessage(nickname, data);
    });
});

//We define a route handler / that gets called when we hit our website home.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/styles.css', (req, res) => {
    res.sendFile(__dirname + '/styles.css');
});

//5. Make the http server listen on port 3000.
server.listen(3000, () => {
    console.log('Listening at http://localhost:3000/');
});
