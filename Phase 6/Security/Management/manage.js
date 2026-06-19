// npm install dotenv

require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

// All secrets from environment
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const DB_URL = process.env.DB_URL;
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;

// Validate secrets on startup
function validateEnv() {
  const required = ["JWT_SECRET", "DB_URL", "API_KEY"];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error(`Missing required env variables: ${missing.join(", ")}`);
    process.exit(1); // Stop server immediately
  }

  console.log("All environment variables loaded");
}

validateEnv();

// Fake user store
const users = [];

// REGISTER
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
  users.push({ username, password: hashedPassword });

  res.json({ message: "Registered successfully" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  // JWT_SECRET comes from .env
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
});

// PROTECTED ROUTE
app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Access granted", user: decoded });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// OUTPUT

// Server startup — all secrets present:
// All environment variables loaded
// Server running on port 3000

// Server startup — missing JWT_SECRET:
// Missing required env variables: JWT_SECRET
// process exits immediately — server never starts

// POST /register with { "username": "alice", "password": "pass123" }:
// json{ "message": "Registered successfully" }

// POST /login with correct credentials:
// json{
//   "message": "Login successful",
//   "token": "eyJhbGci...signed with JWT_SECRET from .env"
// }

//  no .env file
// 1. POST /register
// { "message": "Registered successfully" }


// proper .env present
// 2. POST /login - correct creds
// {
//   "message": "Login successful",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV..."
// }

// 3. POST /login - wrong password
// { "message": "Invalid credentials" }

// 4. POST /login - nonexistent user
// { "message": "Invalid credentials" }

// 5. GET /profile - valid token
// {
//   "message": "Access granted",
//   "user": { "username": "zach", "iat": 1781858615, "exp": 1781862215 }
// }

// 6. GET /profile - no token
// { "message": "No token" }

// 7. GET /profile - garbage token
// { "message": "Invalid token" }