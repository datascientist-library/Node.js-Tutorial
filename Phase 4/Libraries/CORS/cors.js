// npm install cors

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'John' }
    ]);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// POST
// http://localhost:3000/users


// Response:
// [
//   { "id": 1, "name": "John" }
// ]
