// npm init -y
// npm install express

const express = require('express');
const app = express();

// Middleware
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next(); // Pass control to the next middleware/route
}

app.use(logger);

// Route
app.get('/', (req, res) => {
    res.send('Hello from Express');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Visit
// http://localhost:3000/