const User = require('../models/User');

// CREATE
exports.create = async (data) => {
    return await User.create(data);
};

// READ ALL
exports.findAll = async () => {
    return await User.find();
};

// READ ONE
exports.findById = async (id) => {
    return await User.findById(id);
};

// UPDATE
exports.updateById = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
exports.deleteById = async (id) => {
    return await User.findByIdAndDelete(id);
};