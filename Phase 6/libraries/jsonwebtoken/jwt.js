// npm init -y
// npm install express jsonwebtoken

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

app.use(express.json());

const SECRET_KEY = "my-super-secret-key";


// Fake users database

const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "Admin"
  },
  {
    id: 2,
    username: "john",
    password: "john123",
    role: "Employee"
  }
];


// Login Route

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u =>
      u.username === username &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    SECRET_KEY,
    {
      expiresIn: "1h"
    }
  );

  res.json({
    message: "Login successful",
    token
  });
});


// Authentication Middleware

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token required"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}


// RBAC Middleware

function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
}

// Public Route

app.get("/", (req, res) => {
  res.send("Welcome to JWT Demo");
});


// Protected Route

app.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user
  });
});


// Admin Only Route

app.get(
  "/admin",
  authenticate,
  authorize("Admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin"
    });
  }
);


// Start Server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// OUTPUT

// GET / (public route)
// Welcome to JWT Demo

// POST /login - john logs in
// Request: {"username":"john","password":"john123"}
// {
//   "message": "Login successful",
//   "token": "eyJhbGciOiJIUzI1NiIsIn...."
// }

// POST /login - admin logs in
// {
//   "message": "Login successful",
//   "token": "eyJhbGciOiJIUzI1NiIsIn...."
// }

// POST /login - wrong password
// { "message": "Invalid credentials" }

// GET /profile - no token
// { "message": "Token required" }

// GET /profile - with john's valid token
// {
//   "message": "Profile data",
//   "user": {
//     "id": 2,
//     "username": "john",
//     "role": "Employee",
//     "iat": 1781853593,
//     "exp": 1781857193
//   }
// }

// GET /admin - as john 
// { "message": "Access denied" }

// GET /admin - as admin
// { "message": "Welcome Admin" }

// GET /profile - garbage token
// { "message": "Invalid or expired token" }