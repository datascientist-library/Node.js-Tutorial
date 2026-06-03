// Scope in javascript determines where a variable can be accessed in your code

// 1. Global Scope
let name = "Harry";

function greet() {
  console.log(name);
}

greet();
console.log(name);

// 2. Functional Scope 
function greet() {
  var message = "Hello";
  console.log(message);
}

greet();

console.log(message);

// 3. Block Scope
if (true) {
  let age = 25;
  const city = "Mumbai";

  console.log(age);
  console.log(city);
}

console.log(age);
console.log(city);


// 4. Lexocal Scope
function outer() {
  let name = "Harry";

  function inner() {
    console.log(name);
  }

  inner();
}

outer();