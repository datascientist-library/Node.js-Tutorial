const User = require('../models/User');

// Create
exports.createUser = async (userData) => {
    return await User.create(userData);
};

// Read All
exports.getUsers = async () => {
    return await User.find();
};

// Read One
exports.getUserById = async (id) => {
    return await User.findById(id);
};

// Update
exports.updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

// Delete
exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};