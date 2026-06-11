// 1. CREATE
const express = require('express');
const app = express();

app.use(express.json());

let users = [];

// create user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

// start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Request
// Method: POST
// URL: http://localhost:3000/users

// Headers:
// Content-Type: application/json

// {
//   "name": "Bob"
// }


// Response
// {
//   "id": 1,
//   "name": "Bob"
// }