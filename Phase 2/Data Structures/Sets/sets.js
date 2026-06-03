// A Set is a collection of unique values. Unlike arrays, a Set does not allow duplicate elements.

// Example

const set = new Set();

set.add(10);
set.add(20);
set.add(10);

console.log(set);

// Example

const numbers = [1, 2, 2, 3, 3, 4];

const uniqueNumbers = new Set(numbers);

console.log(uniqueNumbers);

