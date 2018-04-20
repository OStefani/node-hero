/** The JSON.stringify() method converts a JavaScript value to a JSON string, 
 * optionally replacing values if a replacer function is specified or optionally 
 * including only the specified properties if a replacer array is specified. */
const http = require('http');
const data = require('./data/inventory');

http.createServer((req, res) => {
    if (req.url === '/') {
        /** Явный способ описания заголовков, заголовки отправляются сразу, не дожидаясь res.end() */
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify(data));
    }
    else if (req.url === '/instock') {
        //list = listInStock();
        res.end(JSON.stringify(listInStock()));
    }
    else if (req.url === '/onbackorder') {
        res.end(JSON.stringify(listOnBackOrder()));
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("Data not found");
    }
    
}).listen(3000, (err) => {
    if (err) console.log(err);
    console.log(`Server running at http://localhost:3000`);
});

function listInStock() {
    let list = data.filter((item) => {
        return item.avail === 'In stock';
    });    
    return list;
}

function listOnBackOrder() {
    let list = data.filter(function(item) {
		return item.avail === "On back order";
    });
    return list;
}