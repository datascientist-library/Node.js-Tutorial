const request = require('supertest');
const app     = require('./app');

test('GET /ping returns pong', async () => {
  const res = await request(app).get('/ping');

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('pong');
});

test('POST /greet returns greeting', async () => {
  const res = await request(app)
    .post('/greet')
    .send({ name: 'Alice' });

  expect(res.statusCode).toBe(200);
  expect(res.body.greeting).toBe('Hello, Alice!');
});

test('POST /greet returns 400 if name missing', async () => {
  const res = await request(app)
    .post('/greet')
    .send({});

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe('Name is required');
});

// OUTPUT

// PASS  app.test.js
//   GET /ping returns pong (38ms)
//   POST /greet returns greeting (10ms)
//   POST /greet returns 400 if name missing (5ms)

// Tests: 3 passed, 3 total
// Time:  1.102s