// 2. READ

const express = require('express');
const app = express();

app.use(express.json());

let users = [];

// CREATE
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

// READ
app.get('/users', (req, res) => {
    res.json(users);
});

// start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Request
// GET /users

// Response
// [
//   {
//     "id": 1,
//     "name": "John"
//   },
//   {
//     "id": 2,
//     "name": "Alice"
//   }
// ]