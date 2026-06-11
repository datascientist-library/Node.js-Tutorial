// npm install express-validator

const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(express.json());

// POST /users with validation
app.post(
    '/users',
    [
        body('name')
            .notEmpty()
            .withMessage('Name is required'),

        body('email')
            .isEmail()
            .withMessage('Valid email required'),

        body('age')
            .isInt({ min: 18 })
            .withMessage('Age must be at least 18')
    ],
    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        res.status(201).json({
            message: 'User created successfully',
            data: req.body
        });
    }
);

/* Start server */
app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// Invalid Request

// {
//   "name": "",
//   "email": "abc",
//   "age": 15
// }

// Response:

// {
//   "errors": [
//     {
//       "msg": "Name is required"
//     },
//     {
//       "msg": "Valid email required"
//     },
//     {
//       "msg": "Age must be at least 18"
//     }
//   ]
// }

// -------------------------------------------------------

// Valid request
// {
//   "name": "John",
//   "email": "john@example.com",
//   "age": 25
// }

// Response:
// {
//   "message": "User created successfully",
//   "data": {
//     "name": "John",
//     "email": "john@example.com",
//     "age": 25
//   }
// }