const userService = require('../services/userService');

exports.createUser = async (req, res) => {
    const user = await userService.createUser(req.body);
    res.json(user);
};