const userService = require('../services/userService');

// Create
exports.createUser = async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
};

// Get all
exports.getUsers = async (req, res) => {
    const users = await userService.getUsers();
    res.json(users);
};

// Get by ID
exports.getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
};

// Update
exports.updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
};

// Delete
exports.deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
};