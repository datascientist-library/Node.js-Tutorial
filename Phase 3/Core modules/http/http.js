// The http module is a built-in Node.js module used to create web servers and handle HTTP requests/responses.

// Example

const http = require("http");

const server = http.createServer((req, res) => {
    res.end("Hello World");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});

// After running this code, visit "http://localhost:3000"

// Sending JSON

const http = require("http");

const server = http.createServer((req, res) => {

    const user = {
        id: 1,
        name: "John"
    };

    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify(user));
});

server.listen(3000);