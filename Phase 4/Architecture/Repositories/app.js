const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');

const app = express();
app.use(express.json());

// Routes
app.post('/users', userController.createUser);
app.get('/users', userController.getUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/testDB')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});