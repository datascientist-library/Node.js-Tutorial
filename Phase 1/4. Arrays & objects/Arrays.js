// 1. Creating Array
console.log("1. Creating array")

const color = ["Red", "Blue", "Orange", "Yellow"];

console.log(color[0]);
console.log(color[1]);
console.log(color[2]);
console.log(color[3]);


// 2. Adding elements
console.log("2. Adding elements in a list")

const fruits = ["Apple", "Banana", "Orange", "Peach", "Watermelon"];

fruits.push("Custard Apple");

console.log(fruits);

// 3. Removing elements
console.log("3. Removing elements from a list")

const fruitsnew = ["Apple", "Banana", "Orange", "Peach", "Watermelon"];

fruitsnew.pop();

console.log(fruitsnew);
console.log("length of array:", fruitsnew.length);

// 4. Sum of numbers
console.log("4. Sum of numbers")

const numbers = [10, 20, 30, 40];
let sum = 0;

for (const num of numbers) {
  sum += num;
}

console.log("Sum of numbers are:",sum);