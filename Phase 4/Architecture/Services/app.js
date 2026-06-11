const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// routes
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

// connect DB
mongoose.connect('mongodb://127.0.0.1:27017/testDB')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});


// Test
// POST http://localhost:3000/users

// Body:

// {
//   "name": "John",
//   "email": "john@test.com",
//   "age": 25
// }


// Response
// {
//   "_id": "65f1c9b8a12f4d23c8a9e111",
//   "name": "John",
//   "email": "john@test.com",
//   "age": 25,
//   "__v": 0
// }