// The event loop is a continuously running process that:
// takes completed async tasks
// pushes their callbacks into execution


// Example

console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

setImmediate(() => console.log("Immediate"));

Promise.resolve().then(() => console.log("Promise"));

process.nextTick(() => console.log("NextTick"));

console.log("End");