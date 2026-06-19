const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const ACCESS_SECRET = "access_secret";
const REFRESH_SECRET = "refresh_secret";

// refresh token store
let refreshTokens = [];


// LOGIN
app.post("/login", (req, res) => {
  const { username } = req.body;

  const user = { username };

  // Short-lived access token
  const accessToken = jwt.sign(user, ACCESS_SECRET, { expiresIn: "15s" });

  // Long-lived refresh token
  const refreshToken = jwt.sign(user, REFRESH_SECRET, { expiresIn: "1m" });

  refreshTokens.push(refreshToken);

  res.json({
    message: "Login successful",
    accessToken,
    refreshToken
  });
});


// ACCESS PROTECTED ROUTE

app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, ACCESS_SECRET);

    res.json({
      message: "Access granted to protected data",
      user
    });
  } catch (err) {
    res.status(401).json({
      message: "Access token expired or invalid"
    });
  }
});


//REFRESH TOKEN ROUTE
app.post("/refresh", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  if (!refreshTokens.includes(token)) {
    return res.status(403).json({ message: "Refresh token not valid" });
  }

  try {
    const user = jwt.verify(token, REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { username: user.username },
      ACCESS_SECRET,
      { expiresIn: "15s" }
    );

    res.json({
      message: "New access token generated",
      accessToken: newAccessToken
    });

  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

//LOGOUT 
app.post("/logout", (req, res) => {
  const { token } = req.body;

  refreshTokens = refreshTokens.filter(t => t !== token);

  res.json({ message: "Logged out successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


// OUTPUT
// POST /login with {"username": "alice" }
// json{
//   "message": "Login successful",
//   "accessToken": "eyJhbGci...short-lived (15s)",
//   "refreshToken": "eyJhbGci...long-lived (1m)"
// }

// GET /profile with Authorization:
// json{
//   "message": "Access granted to protected data",
//   "user": {
//     "username": "alice",
//     "iat": 1700000000,
//     "exp": 1700000015
//   }
// }

// GET /profile 
// json{
//   "message": "Access token expired or invalid"
// }

// POST /refresh with { "token": "<refreshToken>" }
// json{
//   "message": "New access token generated",
//   "accessToken": "eyJhbGci...brand new token (15s)"
// }

// POST /logout with { "token": "<refreshToken>" }
// json{
//   "message": "Logged out successfully" 
// }

// POST /refresh 
// {
//   "message": "Refresh token not valid"
// }