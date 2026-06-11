const userRepo = require('../repositories/userRepository');

// Create
exports.createUser = async (userData) => {
    return await userRepo.create(userData);
};

// Get all
exports.getUsers = async () => {
    return await userRepo.findAll();
};

// Get by ID
exports.getUserById = async (id) => {
    return await userRepo.findById(id);
};

// Update
exports.updateUser = async (id, data) => {
    return await userRepo.updateById(id, data);
};

// Delete
exports.deleteUser = async (id) => {
    return await userRepo.deleteById(id);
};