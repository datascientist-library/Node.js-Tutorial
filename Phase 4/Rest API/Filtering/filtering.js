const express = require('express');
const app = express();

const users = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Alice', age: 30 },
    { id: 3, name: 'Bob', age: 25 }
];

app.get('/users', (req, res) => {
    const age = Number(req.query.age);

    if (age) {
        const filteredUsers = users.filter(
            user => user.age === age
        );

        return res.json(filteredUsers);
    }

    res.json(users);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// Get All Users
// GET http://localhost:3000/users

// Response:

// [
//   { "id": 1, "name": "John", "age": 25 },
//   { "id": 2, "name": "Alice", "age": 30 },
//   { "id": 3, "name": "Bob", "age": 25 }
// ]

// Filter by Age
// GET http://localhost:3000/users?age=25

// Response:

// [
//   { "id": 1, "name": "John", "age": 25 },
//   { "id": 3, "name": "Bob", "age": 25 }
// ]