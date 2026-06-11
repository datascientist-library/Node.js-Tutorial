const express = require('express');
const app = express();

// Middleware 1
app.use((req, res, next) => {
    console.log('Step 1: Request received');
    next();
});

// Middleware 2
app.use((req, res, next) => {
    console.log('Step 2: Processing request');
    next();
});

// Route Handler
app.get('/', (req, res) => {
    console.log('Step 3: Route handler executed');
    res.send('Response sent to client');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Visit 
// http://localhost:3000/

// Terminal Output:

// Step 1: Request received
// Step 2: Processing request
// Step 3: Route handler executed