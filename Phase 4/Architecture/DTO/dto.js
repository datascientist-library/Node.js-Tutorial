const express = require('express');
const app = express();

app.use(express.json());

// DTO Function
function createUserDTO(body) {
    return {
        name: body.name,
        email: body.email
    };
}

app.post('/users', (req, res) => {
    const userDTO = createUserDTO(req.body);

    res.json({
        message: 'User created',
        user: userDTO
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// POST
// http://localhost:3000/users

// {
//   "name": "John",
//   "email": "john@test.com",
//   "password": "123",
//   "role": "admin"
// }

// OUTPUT
// {
//   "message": "User created",
//   "user": {
//     "name": "John",
//     "email": "john@test.com"
//   }
// }