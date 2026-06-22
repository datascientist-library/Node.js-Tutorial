const express = require('express');
const { createClient } = require('redis');
const http = require('http');

const LIMIT = 3;
const WINDOW = 10; 

async function main() {
  const redisClient = createClient();
  redisClient.on('error', (err) => console.error('Redis Error', err));
  await redisClient.connect();

  const app = express();

  // Rate limiter middleware
  async function rateLimiter(req, res, next) {
    const ip = req.ip;
    const key = `rate:${ip}`;

    // Increment the counter for this IP
    const count = await redisClient.incr(key);

    // On first request, set the expiry window
    if (count === 1) {
      await redisClient.expire(key, WINDOW);
    }

    const ttl = await redisClient.ttl(key);
    console.log(`  [Rate Limiter] IP: ${ip} | Count: ${count}/${LIMIT} | TTL: ${ttl}s`);

    if (count > LIMIT) {
      console.log(`  [Rate Limiter] BLOCKED`);
      return res.status(429).json({
        message: 'Too many requests - try again later',
        retryAfter: `${ttl}s`,
      });
    }

    next();
  }

  app.use(rateLimiter);

  app.get('/api/data', (req, res) => {
    res.json({ message: 'Here is your data!' });
  });
}

main();


// OUTPUT

// Server running — limit: 3 requests per 10s

// Request 1
//   [Rate Limiter] IP: 127.0.0.1 | Count: 1/3 | TTL: 10s
//   Response (200): {"message":"Here is your data!"}

// Request 2
//   [Rate Limiter] IP: 127.0.0.1 | Count: 2/3 | TTL: 10s
//   Response (200): {"message":"Here is your data!"}

// Request 3
//   [Rate Limiter] IP: 127.0.0.1 | Count: 3/3 | TTL: 10s
//   Response (200): {"message":"Here is your data!"}

// Request 4
//   [Rate Limiter] IP: 127.0.0.1 | Count: 4/3 | TTL: 10s
//   [Rate Limiter] BLOCKED
//   Response (429): {"message":"Too many requests - try again later","retryAfter":"10s"}

// Request 5
//   [Rate Limiter] IP: 127.0.0.1 | Count: 5/3 | TTL: 10s
//   [Rate Limiter] BLOCKED
//   Response (429): {"message":"Too many requests - try again later","retryAfter":"10s"}