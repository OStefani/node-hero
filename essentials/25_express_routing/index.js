const express = require('express');
// returns a middleware
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();

var skierTerms = [
    {
        term: "Rip",
        defined: "To move at a high rate of speed"
    },
    {
        term: "Huck",
        defined: "To throw your body off of something, usually a natural feature like a cliff"
    },
    {
        term: "Chowder",
        defined: "Powder after it has been sufficiently skied"
    }
];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// add a custom middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url} - ${JSON.stringify(req.body)}`);
    next();
})

app.use(express.static('./public'));

// in order any domain could make a request to the dictionary
app.use(cors());
// set up a get rout
// the same callback that is used in nodejs but with some additional functions like json(), which sringify, adds headers and response
app.get('/dictionary-api', (req, res) => {
    res.json(skierTerms);
});
app.post("/dictionary-api", function(req, res) {
    skierTerms.push(req.body);
    res.json(skierTerms);
});

app.delete("/dictionary-api/:term", function(req, res) {
    skierTerms = skierTerms.filter(function(definition) {
        return definition.term.toLowerCase() !== req.params.term.toLowerCase();
    });
    res.json(skierTerms);
});


app.listen(3000);