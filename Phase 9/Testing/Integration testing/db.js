const users = [];

function saveUser(user) {
  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find(u => u.email === email) || null;
}

function clearAll() {
  users.length = 0; 
}

module.exports = { saveUser, findUserByEmail, clearAll };