// npm install express express-session

const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Home page
app.get("/", (req, res) => {
  if (req.session.user) {
    res.send(`
      <h2>Welcome ${req.session.user}</h2>
      <a href="/profile">Profile</a><br>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.send(`
      <h2>Please Login</h2>
      <form method="POST" action="/login">
        <input name="username" placeholder="Username">
        <button type="submit">Login</button>
      </form>
    `);
  }
});

// Login
app.post("/login", (req, res) => {
  const username = req.body.username;

  req.session.user = username;

  console.log("Session Created:", req.session);

  res.redirect("/");
});

// Protected route
app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Please login first");
  }

  res.send(`
    <h2>Profile Page</h2>
    <p>User: ${req.session.user}</p>
    <a href="/">Home</a>
  `);
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("Logged out successfully");
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


// Visit
// http://localhost:3000

// OUTPUT
// Home - before login:
// Please Login
// [Username input box]

// Home - after login with "John":
// Welcome John
// Profile
// Logout

// /profile - when logged in:
// Profile Page
// User: John
// Home

// /logout:
// Logged out successfully