const express = require('express');
const app = express();

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to my Express App');
});

// Route parameter
app.get('/user/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
});

// Query parameter
app.get('/search', (req, res) => {
    res.send(`You searched for ${req.query.item}`);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Home Route
// http://localhost:3000/

// Route Parameter
// http://localhost:3000/user/World

// Query Parameter
// http://localhost:3000/search?item=laptop