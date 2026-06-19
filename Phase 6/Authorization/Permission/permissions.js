const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Users with direct permissions assigned

const users = [
  {
    id: 1,
    username: "alice",
    permissions: ["articles:read", "articles:write", "articles:delete"]
  },
  {
    id: 2,
    username: "bob",
    permissions: ["articles:read", "articles:write"]
  },
  {
    id: 3,
    username: "carol",
    permissions: ["articles:read"]
  },
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


// MIDDLEWARE: Check Permission

function hasPermission(permission) {
  return (req, res, next) => {
    const userPermissions = req.user.permissions || [];

    if (!userPermissions.includes(permission)) {
      return res.status(403).json({
        message: `Access denied. Missing permission: '${permission}'`
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
    { id: user.id, username: user.username, permissions: user.permissions },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});


// ROUTES

app.get("/articles",
  authenticate,
  hasPermission("articles:read"),
  (req, res) => {
    res.json({
      message: "📄 Articles fetched",
      user: req.user.username
    });
  }
);

app.post("/articles",
  authenticate,
  hasPermission("articles:write"),
  (req, res) => {
    res.json({
      message: "✏️ Article created",
      user: req.user.username
    });
  }
);

app.delete("/articles/:id",
  authenticate,
  hasPermission("articles:delete"),
  (req, res) => {
    res.json({
      message: `🗑️ Article ${req.params.id} deleted`,
      user: req.user.username
    });
  }
);

app.listen(3000, () => console.log("Server running on port 3000"));


// OUTPUT

// POST /login with { "username": "carol" }:
// {
//   "message": "Login successful",
//   "token": "eyJhbGci...contains permissions: ['articles:read']"
// }


// GET /articles — carol (read only) — succeeds:
// {
//   "message": "Articles fetched",
//   "user": "carol"
// }

// POST /articles — carol — blocked:
// {
//   "message": "Access denied. Missing permission: 'articles:write'"
// }


// DELETE /articles/1 — bob — blocked:
// {
//   "message": "Access denied. Missing permission: 'articles:delete'"
// }


// DELETE /articles/1 — alice — succeeds:
// {
//   "message": "Article 1 deleted",
//   "user": "alice"
// }