var waitTime = 3000;
var currentTime = 0;
var waitInterval = 500;
var percentWaited = 0;


function writeWaitingPercent(p) {
    // clear the last line inside of the terminal
    process.stdout.clearLine();
    // move a cursor back to the begining of the line
    process.stdout.cursorTo(0);
    process.stdout.write(`waiting... ${p}`);
}
var interval = setInterval(()=> {
    currentTime += waitInterval;
    percentWaited = Math.floor((currentTime/waitTime)*100);
    writeWaitingPercent(percentWaited);
}, waitInterval);

setTimeout(() => {
    clearInterval(interval);
    writeWaitingPercent(100);
    console.log('done');
}, waitTime);

writeWaitingPercent(percentWaited);