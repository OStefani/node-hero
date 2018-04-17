// node.js app can run and comunicate with other applications on the computer
// the child_process contains the exec funtion
var exec = require('child_process').exec;
/**Spawns a shell then executes the command within that shell, buffering any 
 * generated output. The command string passed to the exec function is processed directly 
 * by the shell and special characters (vary based on shell) need to be dealt 
 * with accordingly */
// we can collect any data that get returned byt the process. The output will be returned to 
// the second argument (callback);
exec('ls', (err, data) => {
    if (err) throw err;
    console.log("Listing finished");
    console.log(data);
});