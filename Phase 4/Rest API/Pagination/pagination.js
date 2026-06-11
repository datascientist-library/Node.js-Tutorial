const express = require('express');
const app = express();

const users = [
    'John', 'Alice', 'Bob', 'Mike', 'David',
    'Sarah', 'Tom', 'Emma', 'Chris', 'Sophia'
];

app.get('/users', (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedUsers = users.slice(startIndex, endIndex);

    res.json(paginatedUsers);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// Test
// Page 1
// GET http://localhost:3000/users?page=1&limit=3

// Response:

// [
//   "John",
//   "Alice",
//   "Bob"
// ]

// Page 2
// GET http://localhost:3000/users?page=2&limit=3

// Response:

// [
//   "Mike",
//   "David",
//   "Sarah"
// ]

// Page 3
// GET http://localhost:3000/users?page=3&limit=3

// Response:

// [
//   "Tom",
//   "Emma",
//   "Chris"
// ]