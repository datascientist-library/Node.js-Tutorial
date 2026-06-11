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

// UPDATE
app.put('/users/:id', (req, res) => {
    const user = users.find(
        user => user.id === parseInt(req.params.id)
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = req.body.name;

    res.json(user);
});

// start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Request
// PUT /users/1

// Content-Type: application/json

// {
//   "name": "John Updated"
// }

// Response
// {
//   "id": 1,
//   "name": "John Updated"
// }