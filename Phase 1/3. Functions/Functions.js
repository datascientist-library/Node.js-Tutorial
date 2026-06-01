// 1. Function Declaration

function world() {
  console.log("Hello World");
}

world();

// 2. Function with parameters

function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Alice");


// 3. Function to add two numbers

function add(a, b) {
  return a + b;
}

let result = add(5, 3);
console.log(result);


// 4. Function to check even or odd numbers

function isEven(number) {
  return number % 2 === 0;
}

console.log(isEven(10));
console.log(isEven(7));  