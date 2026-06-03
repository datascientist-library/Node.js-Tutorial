// Spread expands an array, object, or iterable into individual elements.

// 1. Combining Arrays
const arr1 = [1, 2];
const arr2 = [3, 4];

const combined = [...arr1, ...arr2];

console.log(combined);


// 2. Copying Arrays
const original = [1, 2, 3];

const copy = [...original];

console.log(copy);

// 3. Overriding properties
const user = {
  name: "Harry",
  age: 25
};

const updated = {
  ...user,
  age: 30
};

console.log(updated);


// Rest collects multiple values into a single array.

// 1. Function Parameters
function sum(...numbers) {
  console.log(numbers);
}

sum(1, 2, 3, 4);

// 2. Array Destructuring
const numbers = [1, 2, 3, 4, 5];

const [first, ...rest] = numbers;

console.log(first);
console.log(rest);

// 3. Object Destructuring
const user = {
  name: "Harry",
  age: 25,
  city: "Mumbai"
};

const { name, ...rest } = user;

console.log(name);
console.log(rest);

