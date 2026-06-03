// The Event Loop is the mechanism that allows JavaScript to perform asynchronous operations even though JavaScript itself is single-threaded.

// Examples
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");


// Examples
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");


// Example
console.log("1");

Promise.resolve().then(() => {
  console.log("2");
});

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");