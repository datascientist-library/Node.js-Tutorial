const express = require('express');
const session = require('express-session');
const { createClient } = require('redis');
const { RedisStore } = require('connect-redis');
const http = require('http');

async function main() {
  // Connect Redis client
  const redisClient = createClient();
  redisClient.on('error', (err) => console.error('Redis Error', err));
  await redisClient.connect();
  console.log('Redis connected\n');

  // Set up Express with Redis-backed sessions
  const app = express();
  app.use(express.json());
  app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'keyboard_cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 },
  }));

  // POST /login - saves user info into the session
  app.post('/login', (req, res) => {
    const { username } = req.body;
    req.session.user = { username, role: 'student' };
    console.log(`[/login]    Session created - ID: ${req.session.id}`);
    console.log(`[/login]    Stored in session: ${JSON.stringify(req.session.user)}`);
    res.json({ message: 'Logged in', sessionId: req.session.id });
  });

  // GET /dashboard - reads user back from session
  app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
      console.log('[/dashboard] No session found - unauthorized');
      return res.status(401).json({ message: 'Not logged in' });
    }
    console.log(`[/dashboard] Session found - ${JSON.stringify(req.session.user)}`);
    res.json({ message: `Welcome, ${req.session.user.username}!` });
  });

  // POST /logout - destroys the session
  app.post('/logout', (req, res) => {
    const id = req.session.id;
    req.session.destroy(() => {
      console.log(`[/logout]   Session destroyed - ID: ${id}`);
      res.json({ message: 'Logged out' });
    });
  });
}

main();


// OUTPUT

// Redis connected

// Server running on port 3000

// POST /login 
// [/login]    Session created - ID: E_4ka7sujApvai9JOauaXcMoxEZdiue3
// [/login]    Stored in session: {"username":"zach","role":"student"}
// Response: {"message":"Logged in","sessionId":"E_4ka7sujApvai9JOauaXcMoxEZdiue3"}

// GET /dashboard (with session cookie)
// [/dashboard] Session found - {"username":"zach","role":"student"}
// Response: {"message":"Welcome, zach!"}

// GET /dashboard (no cookie)
// [/dashboard] No session found - unauthorized
// Response: {"message":"Not logged in"}

// POST /logout
// [/logout]   Session destroyed - ID: E_4ka7sujApvai9JOauaXcMoxEZdiue3
// Response: {"message":"Logged out"}

// GET /dashboard (after logout)
// [/dashboard] No session found - unauthorized
// Response: {"message":"Not logged in"}