const request = require('supertest');
const app = require('./app');

// GET /users
describe('GET /users', () => {
  test('returns empty array initially', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});

// POST /users
describe('POST /users', () => {
  test('creates a new user successfully', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice', email: 'alice@example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe('Alice');
    expect(res.body.email).toBe('alice@example.com');
  });

  test('returns 400 if name is missing', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'alice@example.com' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Name and email are required');
  });

  test('returns 400 if email is missing', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Alice' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Name and email are required');
  });
});

// GET /users/:id
describe('GET /users/:id', () => {
  test('returns a user by ID', async () => {
    // First create a user
    const created = await request(app)
      .post('/users')
      .send({ name: 'Bob', email: 'bob@example.com' });

    const res = await request(app).get(`/users/${created.body.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Bob');
  });

  test('returns 404 for non-existent user', async () => {
    const res = await request(app).get('/users/9999');

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});

// DELETE /users/:id
describe('DELETE /users/:id', () => {
  test('deletes a user successfully', async () => {
    // First create a user
    const created = await request(app)
      .post('/users')
      .send({ name: 'Charlie', email: 'charlie@example.com' });

    const res = await request(app).delete(`/users/${created.body.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User deleted');
  });

  test('returns 404 when deleting non-existent user', async () => {
    const res = await request(app).delete('/users/9999');

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});


// OUTPUT

// PASS  app.test.js
// GET /users
//   returns empty array initially (35ms)

// POST /users
//   creates a new user successfully (12ms)
//   returns 400 if name is missing  (5ms)
//   returns 400 if email is missing (4ms)

// GET /users/:id
//   returns a user by ID (6ms)
//   returns 404 for non-existent user  (3ms)

// DELETE /users/:id
//   deletes a user successfully (5ms)
//   returns 404 when deleting non-existent user (3ms)

// Test Suites: 1 passed, 1 total
// Tests:       8 passed, 8 total
// Snapshots:   0 total
// Time:        1.243s
// Ran all test suites.