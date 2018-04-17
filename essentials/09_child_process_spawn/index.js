/** The child_process.spawn() method spawns a new process using the given command, 
 * with command line arguments in args. If omitted, args defaults to an empty array. */
// Spawn is used for asynchronous tasks, long pocesses, large amounts of data
const spawn = require('child_process').spawn;
// The first argument is the command, the second one is an array of all that can be run 
// after this command
var child_process = spawn('node', ['alwaysTalking'] );
// listen on the event data
child_process.stdout.on('data', (data) => {
    console.log(`STDOUT: ${data.toString().trim()}`);
}) ;
child_process.on("close", function() {

	console.log("Child Process has ended");

	process.exit();

});

setTimeout(function() {

	child_process.stdin.write("stop");

}, 4000);