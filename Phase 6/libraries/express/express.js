// npm install express express-rate-limit

const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

// Allow only 5 requests per minute
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: "Too many requests, please try again later."
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


// OUTPUT

// First 5 requests:

// Hello World!

// 6th request within the same minute:

// {
//   "message": "Too many requests, please try again later."
// }


// HTTP/1.1 200 OK
// X-RateLimit-Limit: 5
// X-RateLimit-Remaining: 4   (then 3, 2, 1, 0 on each subsequent request)
// X-RateLimit-Reset: 1781857968

// Hello World!


// HTTP/1.1 429 Too Many Requests
// X-RateLimit-Limit: 5
// X-RateLimit-Remaining: 0
// Retry-After: 60

// Too many requests, please try again later.