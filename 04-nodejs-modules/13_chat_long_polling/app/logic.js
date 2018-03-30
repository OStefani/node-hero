var clients = [];

exports.subscribe = function(req, res) {
    console.log('subscribe');
    clients.push(res);
    console.log('clients: ', clients);
};

exports.publish = function(message) {
    console.log("publish, '%s", message);
    clients.forEach(res => res.end(message));
    clients = [];
}