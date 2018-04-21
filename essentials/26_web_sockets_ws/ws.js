// create a web socket variable
const webSocketServer = require('ws').Server;
// create an instance of web socket server, using constractor
var wss = new webSocketServer({port: 3000});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        if (message === 'exit') {
            ws.close();
        }
        else {
            //.clients is an array of all connected clients
             wss.clients.forEach((client) => {
                 client.send(message);
             })
        }
    })
    ws.send('Welcome to chat');
})
