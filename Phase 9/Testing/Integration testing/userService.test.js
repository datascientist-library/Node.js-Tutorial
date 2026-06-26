const { registerUser, getUser } = require('./userService');
const db = require('./db');

// Reset DB before each test to avoid data leaking between tests
beforeEach(() => {
  db.clearAll();
});

// Register a new user and retrieve them
test('registers a user and retrieves them by email', () => {
  registerUser('Alice', 'alice@example.com');
  const user = getUser('alice@example.com');

  expect(user.name).toBe('Alice');
  expect(user.email).toBe('alice@example.com');
  expect(user.createdAt).toBeDefined();
});

// Prevent duplicate registrations
test('throws error when registering duplicate email', () => {
  registerUser('Alice', 'alice@example.com');

  expect(() => {
    registerUser('Alice2', 'alice@example.com');
  }).toThrow('User already exists');
});

// Throw error if fields are missing
test('throws error when name or email is missing', () => {
  expect(() => {
    registerUser('', 'alice@example.com');
  }).toThrow('Name and email are required');
});

// Throw error when user not found
test('throws error when getting a non-existent user', () => {
  expect(() => {
    getUser('ghost@example.com');
  }).toThrow('User not found');
});

// Multiple users can be registered independently
test('registers multiple users without conflict', () => {
  registerUser('Alice', 'alice@example.com');
  registerUser('Bob', 'bob@example.com');

  const alice = getUser('alice@example.com');
  const bob = getUser('bob@example.com');

  expect(alice.name).toBe('Alice');
  expect(bob.name).toBe('Bob');
});