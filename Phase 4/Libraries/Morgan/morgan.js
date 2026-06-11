// npm install morgan

const express = require('express');
const morgan = require('morgan');

const app = express();

// Logging middleware
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// Visit:

// http://localhost:3000

// Browser Output:

// Hello World