// Destructuring lets you extract values from arrays or objects and assign them to variables in a concise way.

// Example

const colors = ["red", "green", "blue"];

const [first, second] = colors;

console.log(first, second);

// Skipping Elements
const numbers = [10, 20, 30];

const [first, , third] = numbers;

console.log(first);
console.log(third);

// Rest operator

const numbers = [1, 2, 3, 4, 5];

const [first, ...rest] = numbers;

console.log(first);
console.log(rest);


// Object Destructuring

const user = {
  name: "Harry",
  age: 25
};

const { name, age } = user;

console.log(name, age);


// Renamig variables
const user = {
  name: "Harry",
  age: 25
};

const { name: userName, age: userAge } = user;

console.log(userName);
console.log(userAge);