const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Role definitions - single source of truth
const ROLES = {
  admin:  ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
};

// Fake user DB with roles
const users = [
  { id: 1, username: "alice", role: "admin"  },
  { id: 2, username: "bob",   role: "editor" },
  { id: 3, username: "carol", role: "viewer" },
];

// MIDDLEWARE
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

// MIDDLEWARE: Check Permission
function authorize(permission) {
  return (req, res, next) => {
    const role = req.user.role;
    const permissions = ROLES[role] || [];

    if (!permissions.includes(permission)) {
      return res.status(403).json({
        message: `Access denied. '${role}' cannot '${permission}'`
      });
    }

    next();
  };
}


// LOGIN — issues token with role

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


// ROUTES — protected by role permissions

// Anyone logged in can read
app.get("/articles",
  authenticate,
  authorize("read"),
  (req, res) => {
    res.json({
      message: "Articles fetched",
      user: req.user.username,
      role: req.user.role
    });
  }
);

// Editor and above can write
app.post("/articles",
  authenticate,
  authorize("write"),
  (req, res) => {
    res.json({
      message: "Article created",
      user: req.user.username,
      role: req.user.role
    });
  }
);

// Admin only can delete
app.delete("/articles/:id",
  authenticate,
  authorize("delete"),
  (req, res) => {
    res.json({
      message: `Article ${req.params.id} deleted`,
      user: req.user.username,
      role: req.user.role
    });
  }
);

app.listen(3000, () => console.log("Server running on port 3000"));


// OUTPUT

// POST /login with { "username": "alice" } (admin):
// json{
//   "message": "Login successful",
//   "token": "eyJhbGci...contains role: admin"
// }

// GET /articles - alice (admin), bob (editor), carol (viewer) - all succeed:
// json{
//   "message": "Articles fetched",
//   "user": "carol",
//   "role": "viewer"
// }

// POST /articles - bob (editor) - succeeds:
// json{
//   "message": "Article created",
//   "user": "bob",
//   "role": "editor"
// }

// POST /articles - carol (viewer) - blocked:
// json{
//   "message": "Access denied. 'viewer' cannot 'write'"
// }

// DELETE /articles/1 - alice (admin) - succeeds:
// json{
//   "message": "Article 1 deleted",
//   "user": "alice",
//   "role": "admin"
// }

// DELETE /articles/1 - bob (editor) - blocked:
// json{
//   "message": "Access denied. 'editor' cannot 'delete'"
// }