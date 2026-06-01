// If statement
const prompt = require('prompt-sync')();

let year = prompt('In which year was ECMAScript-2015 specification published? ');

if (year == 2015) {
  console.log('You are right. It was the year 2015.');
}

// If else statement
let num = 8;

if (num % 2 === 0) {
  console.log("Even");
} else {
  console.log("Odd");
}


// Ternary Operator
let temperature = 35;

let message = temperature > 30 ? "Hot day" : "Cool day";

console.log(message);


// Switch statement
let day = 3;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Invalid day");
}

// If else if else statement
let score = 87;

if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else if (score >= 70) {
  console.log("Grade C");
} else {
  console.log("Grade D");
}