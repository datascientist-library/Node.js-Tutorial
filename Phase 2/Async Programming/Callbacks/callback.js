// In asynchronous programming, a callback is a function that is passed to another function and is executed later when an operation completes.
// Callbacks were one of the earliest ways to handle asynchronous tasks such as file reading, network requests, timers, or database queries.

function fetchData(callback) {
    setTimeout(() => {
        const data = "Hello World";
        callback(data);
    }, 2000);
}

fetchData(function(result) {
    console.log(result);
});

console.log("Fetching data...");