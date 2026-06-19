const express = require("express");
const app = express();

const requests = {}; 

const LIMIT = 5; 
const WINDOW_MS = 60 * 1000; 

// Middleware: Rate Limiter
app.use((req, res, next) => {
  const ip = req.ip;

  const currentTime = Date.now();

  if (!requests[ip]) {
    requests[ip] = [];
  }

  // remove old requests
  requests[ip] = requests[ip].filter(
    (timestamp) => currentTime - timestamp < WINDOW_MS
  );

  if (requests[ip].length >= LIMIT) {
    return res.status(429).json({
      message: "Too many requests. Try again later.",
    });
  }

  // store current request timestamp
  requests[ip].push(currentTime);

  next();
});

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Request successful",
    time: new Date().toISOString(),
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


// OUTPUT
// Requests 1–5 - GET / (within 1 minute)
// {
//   "message": "Request successful",
//   "time": "2026-06-15T10:30:01.122Z"
// }

// Request 6 - GET / (still within the same 60s window)
// {
//   "message": "Too many requests. Try again later."
// }

// After 60 seconds pass - GET / (old timestamps expire)
// {
//   "message": "Request successful",
//   "time": "2025-06-15T10:31:05.431Z"
// }