// npm init -y
// npm install express

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    throw new Error('Something went wrong!');
});

// Error Middleware
app.use((err, req, res, next) => {
    console.log('Error:', err.message);

    res.status(500).json({
        message: err.message
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Visit
// http://localhost:3000/