// npm install helmet

const express = require('express');
const helmet = require('helmet');

const app = express();

// Security middleware
app.use(helmet());

app.get('/', (req, res) => {
    res.send('Hello Secure Express App');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Visit

// http://localhost:3000

// Response

// Hello Secure Express App