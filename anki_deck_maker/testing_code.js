var string_one = "this and";
var string_two = "that";

var string_combined = string_one + string_two;
console.log(string_combined);


const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is your favorite programming language? ", (language) => {
    console.log(`You love ${language}.`);
    rl.close();
});