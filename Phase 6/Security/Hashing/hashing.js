// npm install bcrypt

const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

const users = [];


// REGISTER - Hash password
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // 1. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 2. Store user
  users.push({
    username,
    password: hashedPassword,
  });

  console.log("Users DB:", users);

  res.json({
    message: "User registered successfully",
  });
});


// LOGIN - Compare password
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // 1. Find user
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // 2. Compare password with hash
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.json({
    message: "Login successful",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


// Output

// Step 1 — POST /register with { "username": "alice", "password": "mypassword123" }
// {
//   "message": "User registered successfully"
// }
// Console logs:
// Users DB: [
//   {
//     username: 'alice',
//     password: '$2b$10$N9qo8uLOickgx2ZM...'
//   }
// ]


// Step 2 — POST /login with correct password { "username": "alice", "password": "mypassword123" }
// {
//   "message": "Login successful"
// }

// Step 3 — POST /login with wrong password { "username": "alice", "password": "wrongpass" }
// {
//   "message": "Invalid password"
// }

// Step 4 — POST /login with unknown user { "username": "bob", "password": "anything" }
// {
//   "message": "User not found"
// }