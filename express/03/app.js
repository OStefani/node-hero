const express = require('express');
const app = express();

/**
 * Middleware functions are functions that have access to the request object (req), 
 * the response object (res), and the next middleware function in the application’s
 * request-response cycle. 
 */
app.use(express.static('public'));

const logger = require('./logger');
app.use(logger);

const bodyParser = require('body-parser');
//var parseURL = bodyParser.urlencoded({ extended: false });
//app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
//forces the use of the native querystring node module
//the returned value is a middleware function
//const parsUrlEncoded = bodyParser.urlencoded({extended: false});

const blocks = {
    'Fixed': ' Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center',
};
const locations = {
    'Fixed': 'First floor',
    'Movable': 'Second floor',
    'Rotating': 'Third floor',
}
app.param('name', (req, res, next) => {
    const name = req.params.name;
    console.log('name: ', name);
    let block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    //can be accessed from other routes in the application
    req.blockName = block;
    next();
});
/**
 * Returns a rout object which handles all requests to the '/blocks' path
 */
const blocksRout = app.route('/blocks');
//At this object we call get and post etc methods
blocksRout.get((req, res) => {
    res.json(Object.keys(blocks));
    // we can use chaining
}).post((req, res) => {
    var block = req.body;
    console.log(block);
    blocks[block.name] = block.description;
    return res.status(201).json(block.name);
});
// /blocks:name creates name property on the request.params object
//dinamic path
app.route('/blocks/:name')
    .get((req, res) => {
        let description = blocks[req.blockName];
        console.log(description);
        if (!description) {
            return res.status(404).json('No description found for ' + req.params.name);
        }
        //defaulst to 200 status code
        return res.json(description);
        // or res.send(description);
        /** The send function converts  arays and objects into json format and strings will be send as is. */
    });
app.route('/locations/:name')
    .get((req, res) => {
        let location = locations[req.blockName];
        if (!location) {
            return res.status(404).json('No description found for ' + req.params.name);
        }
        return res.json(location);
    });


// routs can take multiple handlers as arguments and will call them sequentially
/**app.post('/blocks', parsUrlEncoded, (req, res) => {
    //form submitted data can be accessedthrough req.body
    let newBlock = req.body;
    console.log('newBlock: ', req.body);
    blocks[newBlock].newBlockName = newBlock.description;
    res.status(201).json(newBlock.name);
});**/


app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Server running at http://localhost:3000');
});