/**To read and writ data to the terminal**/
/**It is used by console.log, cannot be closed, doesn't emmit 'finish'**/
process.stdout.write("Hello");
process.stdout.write("World \n");
var questions  = [
    "What os your name?",
    'What is your fav hobby?',
    'What is your prefered programming language?'
];
var answers = [];

function ask(i) {
    process.stdout.write(`\n\n ${questions[i]}`);
    process.stdout.write( '  >  '  );
}
process.stdin.on('data', function(data) {
    answers.push(data.toString().trim());
    if (answers.length < questions.length) {
        ask(answers.length);

    }
    else {
        process.exit();
    }
});
process.on('exit', () => {
    process.stdout.write('\n\n');
    process.stdout.write(`Go ${answers[1]} ${answers[0]} you can finish writing ${answers[2]} later`);
    process.stdout.write('\n\n');
});
process.on('error', () => {
    console.log(error);
})
ask(0);