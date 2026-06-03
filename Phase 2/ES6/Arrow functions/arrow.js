// Arrow function to add a and b

let a = 554
let b = 6587

const add = (a, b) => {
  return a + b;
};

console.log(add (a, b))


// Square of number
const square = x => x * x;

console.log(square(5));


// Array method 
const nums = [1, 2, 3];

const doubled = nums.map(n => n * 2);

console.log(doubled);


// Arrow function and arguments

const Person = (name) => {
  this.name = name;
};

const p = new Person("Harry");