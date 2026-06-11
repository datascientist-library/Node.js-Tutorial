// Manual validation

const express = require('express');
const app = express();

app.use(express.json());

app.post('/users', (req, res) => {
    const { name, email } = req.body;

    // validation check
    if (!name || !email) {
        return res.status(400).json({
            message: 'Name and Email are required'
        });
    }

    res.status(201).json({
        message: 'User created successfully',
        user: {
            name,
            email
        }
    });
});

// start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// Request:
// Method: POST
// URL:
// http://localhost:3000/users

// {
//   "name": "John"
// }

// Response:
// {
//   "message": "Name and Email are required"
// }

// Status:
// 400 Bad Request

// ----------------------------------------

// Body:
// {
//   "name": "John",
//   "email": "john@example.com"
// }
// Response:
// {
//   "message": "User created successfully",
//   "user": {
//     "name": "John",
//     "email": "john@example.com"
//   }
// }

// Status:

// 201 Created