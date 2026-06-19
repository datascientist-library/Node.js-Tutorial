// NODEJS Vulnerable Example

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

let comments = [];

app.get("/", (req, res) => {
  let html = `
    <h2>Comments</h2>
    <form method="POST" action="/comment">
      <input name="comment" />
      <button>Post</button>
    </form>
    <div>
      ${comments.join("<br>")}
    </div>
  `;

  res.send(html);
});

app.post("/comment", (req, res) => {
  comments.push(req.body.comment);
  res.redirect("/");
});

app.listen(3000);


// OUTPUT

// Attacker types this into the comment box:
// html<script>alert("XSS Hacked!")</script>

// What gets stored in the array:
// javascriptcomments = ['<script>alert("XSS Hacked!")</script>']

// What gets rendered in the HTML:
// html<div>
//   <script>alert("XSS Hacked!")</script>
// </div>

// -----------------------------------------------------------

// FIXED VERSION

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

let comments = [];

// Escape HTML special characters
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

app.get("/", (req, res) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");

  let html = `
    <h2>Comments</h2>
    <form method="POST" action="/comment">
      <input name="comment" />
      <button>Post</button>
    </form>
    <div>
      ${comments.map(escapeHTML).join("<br>")}
    </div>
  `;
  res.send(html);
});

app.post("/comment", (req, res) => {
  comments.push(req.body.comment);
  res.redirect("/");
});

app.listen(3000);

// output

// <div>
//   &lt;script&gt;alert("XSS Hacked!")&lt;/script&gt;
// </div>

// Browser displays it as text