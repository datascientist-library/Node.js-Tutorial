const db = require('./db');

function registerUser(name, email) {
  if (!name || !email) {
    throw new Error('Name and email are required');
  }

  const existing = db.findUserByEmail(email);
  if (existing) {
    throw new Error('User already exists');
  }

  const user = { name, email, createdAt: new Date().toISOString() };
  return db.saveUser(user);
}

function getUser(email) {
  const user = db.findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

module.exports = { registerUser, getUser };