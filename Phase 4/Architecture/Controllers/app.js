// npm init -y
// npm install express mongoose

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/testDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// 1. Start MongoDB
// mongod

// 2. Run server
// node app.js


// Create user
// POST http://localhost:3000/users

// Body:
// {
//   "name": "John",
//   "email": "john@test.com",
//   "age": 25
// }


// Get users
// GET http://localhost:3000/users