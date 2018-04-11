module.exports = function(req, res, next) {
    // + sign converst the date object to miliseconds
    let start = +new Date();
    /**
     * Console.prototype.log = function() {
     * this._stdout.write(util.format.apply(this, arguments) + '\n');
     * };
     */
    // another way to print in console
    // It is used by console.log, cannot be closed, doesn't emmit 'finish'
    let stream = process.stdout;
    // url and method to build a logger message
    let url = req.url;
    console.log('url: ', url);
    let method = req.method;
    //res is emmiter
    // the finish event is emited when the response has been handed offto the OS
    res.on('finish', () => {
        let duration = +new Date - start;
        let message = method + ' to ' + url+ '\ntook ' + duration+ ' ms \n\n';
        stream.write(message);
    });
    // moves request to the next middleware in the stack
    next();
}