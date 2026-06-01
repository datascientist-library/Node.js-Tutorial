// 1. Find the Largest Number in an Array

const a = [10, 5, 20, 8];

let largest = a[0];

for (let i = 1; i < a.length; i++) {
  if (a[i] > largest) {
    largest = a[i];
  }
}


// 2. Sum up all Numbers in an Array

console.log(largest);

const numbers = [1, 2, 3, 4, 5];

let sum = 0;

for (const num of numbers) {
  sum += num;
}

console.log(sum);


// 3. Reverse a String

const str = "hello";

let reversed = "";

for (let i = str.length - 1; i >= 0; i--) {
  reversed += str[i];
}

console.log(reversed);


// 4. To check if a string is a palindrome or not

function isPalindrome(str) {
  let reversed = "";

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return str === reversed;
}

console.log(isPalindrome("racecar"));

// 5. Linear Search

function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }

  return -1;
}

console.log(linearSearch([10, 20, 30, 40], 30));