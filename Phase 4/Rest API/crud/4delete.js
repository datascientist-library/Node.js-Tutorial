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

// DELETE
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(
        user => user.id === parseInt(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users.splice(index, 1);

    res.json({
        message: "User deleted successfully"
    });
});

// start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// Create a user (POST)
// POST http://localhost:3000/users

// Body:
// {
//   "name": "John"
// }

// Delete user request
// DELETE http://localhost:3000/users/1

// Expected response
// {
//   "message": "User deleted successfully"
// }