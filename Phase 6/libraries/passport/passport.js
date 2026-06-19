// npm install express passport passport-local express-session

const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());


// Fake Database
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


// Passport Local Strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find(
      u =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
      return done(null, false, {
        message: "Invalid credentials"
      });
    }

    return done(null, user);
  })
);


// Save user id in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});


// Retrieve user from session
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});


// Login Route
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    message: "Login successful",
    user: {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role
    }
  });
});


// Authentication Middleware
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    message: "Not authenticated"
  });
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


// Protected Route
app.get("/profile", isAuthenticated, (req, res) => {
  res.json(req.user);
});


// Admin Route
app.get(
  "/admin",
  isAuthenticated,
  authorize("Admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin"
    });
  }
);

// Logout
app.post("/logout", (req, res) => {
  req.logout(() => {
    res.json({
      message: "Logged out"
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


// OUTPUT

// 1. POST /login - john logs in
// Response headers include:
// Set-Cookie: connect.sid=s%3A1D438Bcsy5MF505Ps9ecS1ArZt...; Path=/; HttpOnly

// Body:
// {
//   "message": "Login successful",
//   "user": { "id": 2, "username": "john", "role": "Employee" }
// }

// 2.  GET /profile - using john's session cookie
// { "id": 2, "username": "john", "password": "john123", "role": "Employee" }


// 3. GET /admin - as john (Employee)
// { "message": "Access denied" }

// 4. POST /login - admin logs in (new cookie issued)
// {
//   "message": "Login successful",
//   "user": { "id": 1, "username": "admin", "role": "Admin" }
// }

// 5. GET /admin - as admin
// { "message": "Welcome Admin" }

// 6. POST /login - wrong password
// HTTP/1.1 401 Unauthorized
// Unauthorized

// 7. GET /profile - no cookie at all
// { "message": "Not authenticated" }

// 8. POST /logout - then GET /profile again
// { "message": "Logged out" }
// { "message": "Not authenticated" }