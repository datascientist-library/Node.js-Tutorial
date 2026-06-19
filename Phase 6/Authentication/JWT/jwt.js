// npm install express jsonwebtoken

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET_KEY = "my-secret-key";

// Login route
app.post("/login", (req, res) => {
  const { username } = req.body;

  const token = jwt.sign(
    { username: username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token: token
  });
});

// Protected route
app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token missing"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    res.json({
      message: "Protected data",
      user: decoded
    });
  } catch (err) {
    res.status(401).json({
      message: "Invalid token"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


// Visit
// https://localhost:3000

// OUTPUT

// POST /login with body { "username": "alice" }:
// json{
//   "message": "Login successful",
//   "token": "eyJhbGciOiJIUzI..."
// }

// GET /profile with header Authorization: 
// json{
//   "message": "Protected data",
//   "user": {
//     "username": "alice",
//     "iat": 1700000000,
//     "exp": 1700003600
//   }
// }

// GET /profile with no token:
// json{ "message": "Token missing" }

// GET /profile with a expired token:
// json{ "message": "Invalid token" }