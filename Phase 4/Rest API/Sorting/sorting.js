const express = require('express');
const app = express();

const users = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Alice', age: 30 },
    { id: 3, name: 'Bob', age: 20 }
];

app.get('/users', (req, res) => {
    const sort = req.query.sort;

    let sortedUsers = [...users];

    if (sort === 'asc') {
        sortedUsers.sort((a, b) => a.age - b.age);
    } else if (sort === 'desc') {
        sortedUsers.sort((a, b) => b.age - a.age);
    }

    res.json(sortedUsers);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Test
// Ascending Order
// GET http://localhost:3000/users?sort=asc

// Response:

// [
//   { "id": 3, "name": "Bob", "age": 20 },
//   { "id": 1, "name": "John", "age": 25 },
//   { "id": 2, "name": "Alice", "age": 30 }
// ]

// Descending Order
// GET http://localhost:3000/users?sort=desc

// Response:

// [
//   { "id": 2, "name": "Alice", "age": 30 },
//   { "id": 1, "name": "John", "age": 25 },
//   { "id": 3, "name": "Bob", "age": 20 }
// ]