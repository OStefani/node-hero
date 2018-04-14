const express = require('express');
//returns a router instanse which can be mounted as a middleware
const router = express.Router();

const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false }));
const bodyParsed = bodyParser.json(); 
//app.use(bodyParser.json());
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
/**
 * Returns a rout object which handles all requests to the '/blocks' path
 */
//const blocksRout = app.route('/blocks');
//At this object we call get and post etc methods
//blocksRout.get((req, res) => {
    router.route('/', (req, res) => {
    res.json(Object.keys(blocks));
    // we can use chaining
}).post(bodyParsed, (req, res) => {
    var block = req.body;
    console.log(block);
    blocks[block.name] = block.description;
    return res.status(201).json(block.name);
});
// /blocks:name creates name property on the request.params object
//dinamic path
router.route('/:name')
    // For all requests
    .all((req, res, next) => {
        const name = req.params.name;
        let block = name[0].toUpperCase() + name.slice(1).toLowerCase();
        //can be accessed from other routes in the application
        req.blockName = block;
        next();
    })
    .get((req, res) => {
        console.log('blocks: ', blocks); 
        let description = blocks[req.blockName];
        console.log(description);
        if (!description) {
            return res.status(404).json('No description found for ' + req.params.name);
        }
        //defaulst to 200 status code
        return res.json(description);
        // or res.send(description);
        /** The send function converts  arays and objects into json format and strings will be send as is. */
    }).delete((req, res) => {
        let target = req.blockName;
        delete blocks[target];
        console.log('blocks', blocks);
        res.json(target);
    });
router.route('/locations/:name')
    .get((req, res) => {
        let location = locations[req.blockName];
        if (!location) {
            return res.status(404).json('No description found for ' + req.params.name);
        }
        return res.json(location);
    });

module.exports = router;
// routs can take multiple handlers as arguments and will call them sequentially
/**app.post('/blocks', parsUrlEncoded, (req, res) => {
    //form submitted data can be accessedthrough req.body
    let newBlock = req.body;
    console.log('newBlock: ', req.body);
    blocks[newBlock].newBlockName = newBlock.description;
    res.status(201).json(newBlock.name);
});**/
