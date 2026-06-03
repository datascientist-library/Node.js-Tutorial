// Hoisting is JavaScript's default behavior of making variable and function declarations available before they appear in the code.

// Function Declaration Hoisting

greet();

function greet() {
  console.log("Hello");
}

// Function  Expression

sayHi();

var sayHi = function () {
  console.log("Hi");
};

// Arrow Function Hoisting
hello();

const hello = () => {
  console.log("Hello");
};

