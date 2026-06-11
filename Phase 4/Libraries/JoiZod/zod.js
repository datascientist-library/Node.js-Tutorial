// npm install zod

const express = require('express');
const { z } = require('zod');

const app = express();
app.use(express.json());

const userSchema = z.object({
    name: z.string(),
    age: z.number()
});

app.post('/users', (req, res) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: 'Validation Failed',
            errors: result.error.errors
        });
    }

    res.status(201).json({
        message: 'User Created',
        data: result.data
    });
});

app.listen(3000);


// Valid Request
// {
//   "name": "John",
//   "age": 25
// }

// Response:

// {
//   "message": "User Created",
//   "data": {
//     "name": "John",
//     "age": 25
//   }
// }


// Invalid Request
// {
//   "name": "John",
//   "age": "twenty"
// }

// Response:

// {
//   "message": "Validation Failed"
// }