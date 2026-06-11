// npm install express 
// npm install dotenv

require('dotenv').config();

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`Welcome to ${process.env.APP_NAME}`);
});

app.listen(process.env.PORT, () => {
    console.log(
        `Server running on port ${process.env.PORT}`
    );
});

// POST 
// http://localhost:3000

// Output:
// Welcome to My Express App