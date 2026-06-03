// The crypto module is a built-in Node.js module used for: 
// Hashing data
// Generating random values
// Encrypting and decrypting data
// Creating secure tokens
// Password hashing (with additional techniques)

// Creating a hash
const crypto = require("crypto");

const hash = crypto
    .createHash("sha256")
    .update("hello")
    .digest("hex");

console.log(hash);

// Generate Random UUID

const crypto = require("crypto");

const id = crypto.randomUUID();

console.log(id);

// Encrypt data

const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(
    algorithm,
    key,
    iv
);

let encrypted = cipher.update(
    "Hello World",
    "utf8",
    "hex"
);

encrypted += cipher.final("hex");

console.log(encrypted);

// Decrypt data

const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    iv
);

let decrypted = decipher.update(
    encrypted,
    "hex",
    "utf8"
);

decrypted += decipher.final("utf8");

console.log(decrypted);