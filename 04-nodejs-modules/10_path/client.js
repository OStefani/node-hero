const http = require('http');
//null byte doesn't work
const opt = {
    port: 3000,
    host:'127.0.0.1',
    path: '/?secret=%00'
}
//path: '/?secret=O'
/**
 * http.get is convenience method for GET requests. The only difference between 
 * this method and http.request() is that it sets the method to GET and calls 
 * req.end() automatically. Note that the callback must take care to consume the 
 * response data for reasons stated in http.ClientRequest section.
 * 
 * The callback is invoked with a single argument that is an instance of http.IncomingMessage 
 * 
 * An IncomingMessage object is created by http.Server or http.ClientRequest and passed as the first argument to the 'request' and 'response' event respectively. It may be used to access response status, headers and data.

It implements the Readable Stream interface, as well as the following additional 
*events, methods, and properties.
 * */ 
/**
 * If no 'response' handler is added, then the response will be entirely discarded.
 * However, if a 'response' event handler is added, then the data from the response
 * object must be consumed, either by calling response.read() whenever there is 
 * a 'readable' event, or by adding a 'data' handler, or by calling the .resume() 
 * method. Until the data is consumed, the 'end' event will not fire. Also, until 
 * the data is read it will consume memory that can eventually lead to a 'process out 
 * of memory' error.
 * */  
http.get(opt, (res) => {
    let error;
    if (res.statusCode !== 200) {
        error = new Error('Request Failed.\n' +
        `Status Code: ${res.statusCode}`);
    }
    if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
    return;
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        console.log(rawData);
      } catch (e) {
        console.error(e.message);
      }
    });
});