
var questions = [
    "What os your name?",
    'What is your fav hobby?',
    'What is your prefered programming language?'
];
var answers = [];

function ask (ind) {
    process.stdout.write(questions[ind] + '\n');
}
// 2. listen for an answer
process.stdin.on('data', (data) => {
    // 3. push an answer
    // trim is to cut ' ' and \n
    answers.push(data.toString().trim());
    // 4. check a length
    if (answers.length === questions.length) {
        process.exit();
    }
    // 5. ask againe
    ask(answers.length);
    
});
// 1. start ask
ask(0);

process.on('exit', () => {
    process.stdout.write(`Go ${answers[1]} ${answers[0]} you can finish writing ${answers[2]} later \n`);
});
process.on('error', (err) => {
    console.log(err);
});