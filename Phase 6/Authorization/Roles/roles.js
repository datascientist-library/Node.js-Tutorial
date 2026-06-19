const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Users with roles assigned
const users = [
  { id: 1, username: "alice", role: "admin"  },
  { id: 2, username: "bob",   role: "editor" },
  { id: 3, username: "carol", role: "viewer" },
];


// MIDDLEWARE: Verify JWT

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}


// MIDDLEWARE: Check Role

function allowRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. '${req.user.role}' is not allowed.`
      });
    }
    next();
  };
}


// LOGIN

app.post("/login", (req, res) => {
  const { username } = req.body;

  const user = users.find(u => u.username === username);
  if (!user)
    return res.status(404).json({ message: "User not found" });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});


// ROUTES — protected by role

// All roles can read
app.get("/articles",
  authenticate,
  allowRoles("admin", "editor", "viewer"),
  (req, res) => {
    res.json({
      message: "Articles fetched",
      user: req.user.username,
      role: req.user.role
    });
  }
);

// Only admin and editor can write
app.post("/articles",
  authenticate,
  allowRoles("admin", "editor"),
  (req, res) => {
    res.json({
      message: "Article created",
      user: req.user.username,
      role: req.user.role
    });
  }
);

// Only admin can delete
app.delete("/articles/:id",
  authenticate,
  allowRoles("admin"),
  (req, res) => {
    res.json({
      message: `Article ${req.params.id} deleted`,
      user: req.user.username,
      role: req.user.role
    });
  }
);

app.listen(3000, () => console.log("Server running on port 3000"));


// OUPUT

// POST /login with { "username": "bob" }:
// {
//   "message": "Login successful",
//   "token": "eyJhbGci...contains role: editor"
// }

// GET /articles - carol (viewer) - succeeds:
// {
//   "message": "Articles fetched",
//   "user": "carol",
//   "role": "viewer"
// }

// POST /articles - bob (editor) - succeeds:
// {
//   "message": "Article created",
//   "user": "bob",
//   "role": "editor"
// }

// POST /articles - carol (viewer) - blocked:
// {
//   "message": "Access denied. 'viewer' is not allowed."
// }

// DELETE /articles/1 - alice (admin) - succeeds:
// {
//   "message": "Article 1 deleted",
//   "user": "alice",
//   "role": "admin"
// }

// DELETE /articles/1 - bob (editor) - blocked:
// {
//   "message": "Access denied. 'editor' is not allowed."
// }