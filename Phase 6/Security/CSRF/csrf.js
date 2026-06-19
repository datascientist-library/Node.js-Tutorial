// npm install express express-session csurf

const express = require("express");
const session = require("express-session");
const csrf = require("csurf");

const app = express();

app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// CSRF protection middleware
const csrfProtection = csrf();

app.use(csrfProtection);

// Home page with form
app.get("/", (req, res) => {
  res.send(`
    <h2>Transfer Money</h2>

    <form method="POST" action="/transfer">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}" />

      <input name="to" placeholder="Receiver" />
      <input name="amount" placeholder="Amount" />

      <button type="submit">Send</button>
    </form>
  `);
});

// Protected POST route
app.post("/transfer", (req, res) => {
  res.send("Money transferred safely ✅");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


// Output

// GET / — Visiting the page:
// html<h2>Transfer Money</h2>
// <form method="POST" action="/transfer">
//   <input type="hidden" name="_csrf" value="abc123XYZ-real-csrf-token" />
//   <input name="to" placeholder="Receiver" />
//   <input name="amount" placeholder="Amount" />
//   <button type="submit">Send</button>
// </form>

// POST /transfer — Submitting the form with valid CSRF token:
// Money transferred safely

// POST /transfer — Request without CSRF token:
// ForbiddenError: invalid csrf token

// POST /transfer — Request with wrong token:
// ForbiddenError: invalid csrf token