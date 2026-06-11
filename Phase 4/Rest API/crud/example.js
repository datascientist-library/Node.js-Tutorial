const express = require('express');
const app = express();

app.use(express.json());

let users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Alice' }
];

// CREATE
app.post('/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(user);
    res.status(201).json(user);
});

// READ ALL
app.get('/users', (req, res) => {
    res.json(users);
});

// READ ONE
app.get('/users/:id', (req, res) => {
    const user = users.find(
        u => u.id === Number(req.params.id)
    );

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    res.json(user);
});

// UPDATE
app.put('/users/:id', (req, res) => {
    const user = users.find(
        u => u.id === Number(req.params.id)
    );

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    user.name = req.body.name;

    res.json(user);
});

// DELETE
app.delete('/users/:id', (req, res) => {
    users = users.filter(
        u => u.id !== Number(req.params.id)
    );

    res.json({
        message: 'User deleted'
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});