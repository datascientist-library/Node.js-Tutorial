// Modules in JavaScript allow you to split your code into multiple files and share code between them.
// They help make applications Organized, Reusable, Maintainable, Easier to test

// Math operation
import { add, subtract } from "./math.js";

console.log(add(10, 5));
console.log(subtract(10, 5));

// User
import greet, { age } from "./user.js";

greet();
console.log(age);

// Passcode

import { username } from "./secret.js";

console.log(username);
console.log(password);