// The path module is a built-in Node.js module used to work with file and directory paths in a safe, cross-platform way.

// Path join
const path = require("path");

const filePath = path.join("files", "notes", "data.txt");

console.log(filePath);

// path.basename()
const path = require("path");

const filePath = "/users/john/file.txt";

console.log(path.basename(filePath));

// path.dirname()
const path = require("path");

console.log(path.dirname("/users/john/file.txt"));

// path.extname()
const path = require("path");

console.log(path.extname("report.pdf"));