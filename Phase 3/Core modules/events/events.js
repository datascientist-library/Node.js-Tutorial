// The events module allows objects to emit events and listen for events.
// It's the foundation of much of Node.js. Many built-in modules like streams, HTTP servers, and sockets are built on top of events.

// Example
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", () => {
    console.log("Hello!");
});

emitter.emit("greet");

// Passing data with elements
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("userCreated", (name) => {
    console.log(`User created: ${name}`);
});

emitter.emit("userCreated", "Alice");

// Multiple arguments
emitter.on("orderPlaced", (id, amount) => {
    console.log(`Order ${id}: ₹${amount}`);
});

emitter.emit("orderPlaced", 101, 500);