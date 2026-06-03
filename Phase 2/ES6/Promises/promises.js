// A Promise is a JavaScript object that represents the eventual completion (or failure) of an asynchronous operation.

// Example

Promise.resolve(10)
  .then(num => num * 2)
  .then(num => num + 5)
  .then(result => {
    console.log(result);
  });

//  Example
const promise = Promise.resolve("Hello");

promise.then(result => {
  console.log(result);
});

// Handling Errors

const promise = Promise.reject(
  new Error("Something went wrong")
);

promise.catch(error => {
  console.log(error.message);
});