// CRUD Controllers

const User = require('../models/User');

// Create User
exports.createUser = async (req, res) => {
    const user = await User.create(req.body);

    res.status(201).json(user);
};

// Get All Users
exports.getUsers = async (req, res) => {
    const users = await User.find();

    res.json(users);
};

// Get User By ID
exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);

    res.json(user);
};

// Update User
exports.updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(user);
};

// Delete User
exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);

    res.json({
        message: 'User deleted'
    });
};