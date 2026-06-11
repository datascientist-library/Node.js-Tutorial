// npm install joi

const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const userSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required()
});

app.post('/users', (req, res) => {
    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    res.status(201).json({
        message: 'User Created'
    });
});

app.listen(3000);


// POST
// http://localhost:3000/users

// Body (JSON)
// {
//   "name": "John",
//   "age": 25
// }

// Response
// {
//   "message": "User Created"
// }