// npm install express

const express = require('express');
const app = express();

app.get('/api/v1/users', (req, res) => {
    res.json({
        version: 'v1',
        name: 'John'
    });
});

app.get('/api/v2/users', (req, res) => {
    res.json({
        version: 'v2',
        firstName: 'John',
        lastName: 'Doe'
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Test 1
// GET http://localhost:3000/api/v1/users

// Response:

// {
//   "version": "v1",
//   "name": "John"
// }



// Test 2
// GET http://localhost:3000/api/v2/users

// Response:

// {
//   "version": "v2",
//   "firstName": "John",
//   "lastName": "Doe"
// }