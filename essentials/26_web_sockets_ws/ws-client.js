
let ws = new WebSocket('ws://localhost:3000');
ws.onopen = function () {
    setTitle('connected to Chat');
};
ws.onclose = function () {
    setTitle('Dickonnected');
}
ws.onmessage = function(payload) {
    printMessage(payload.data)
};

/** The Document property forms returns a collection (an HTMLCollection) listing all 
 * the <form> elements contained by the document. */
document.forms[0].onsubmit = function () {
    var input = document.getElementById('message');
    ws.send(input.value);
    input.value = '';
};

function setTitle(title) {
    document.querySelector('h1').innerHTML = title;
}

function printMessage(message) {
    var p = document.createElement('p');
    p.innerText = message;
    document.querySelector('div.messages').appendChild(p);
}
