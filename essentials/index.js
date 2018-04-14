/**
 * The process object is a global that provides information about, and control over, 
 * the current Node.js process. As a global, it is always available to Node.js
 * applications without using require().
 */
/**
 * The process.argv property returns an array containing the command line arguments
 * passed when the Node.js process was launched. 
 * The first element will be process.execPath.
 * The second element will be the path to the JavaScript file being executed. 
 * The remaining elements will be any additional command line arguments.
 */
if (process.argv.indexOf('--user')){
    console.log("Hello, user!");
}