// npm init -y
// npm install express

const express = require('express');
const app = express();

app.use(express.json());

// 200 OK
app.get('/users', (req, res) => {
    res.status(200).json({
        message: 'Users fetched successfully'
    });
});

// 201 Created
app.post('/users', (req, res) => {
    res.status(201).json({
        message: 'User created successfully'
    });
});

// 400 Bad Request
app.post('/login', (req, res) => {
    if (!req.body.email) {
        return res.status(400).json({
            message: 'Email is required'
        });
    }

    res.json({
        message: 'Login successful'
    });
});

// 404 Not Found
app.get('/users/:id', (req, res) => {
    res.status(404).json({
        message: 'User not found'
    });
});

// 500 Internal Server Error
app.get('/error', (req, res) => {
    res.status(500).json({
        message: 'Internal server error'
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// 200 OK
// GET /users


// Response:
// {
//   "message": "Users fetched successfully"
// }


// Status:
// 200 OK

// ---------------------------

// 201 Created
// POST /users

// Response:

// {
//   "message": "User created successfully"
// }

// Status:
// 201 Created

// ---------------------------

// 400 Bad Request
// POST /login

// Body:

// {}

// Response:

// {
//   "message": "Email is required"
// }

// Status:

// 400 Bad Request
// ---------------------------

// 404 Not Found
// GET /users/999

// Response:

// {
//   "message": "User not found"
// }

// Status:

// 404 Not Found

// ---------------------------

// 500 Internal Server Error
// GET /error

// Response:

// {
//   "message": "Internal server error"
// }

// Status:

// 500 Internal Server Error
// ---------------------------