// A Map is a collection of key-value pairs where each key is unique. It is similar to an object, but with several advantages:

// Keys can be of any data type (objects, functions, numbers, strings, etc.).
// Maintains insertion order.
// Provides convenient methods for adding, deleting, and accessing entries.

// Example
const map = new Map();
map.set("name", "Alice");
map.set("age", 25);

console.log(map);

// Add or update
map.set("city", "Mumbai");
map.set("age", 26);

// Get name
console.log(map.get("name"));

// Example

const map = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3]
]);

for (const [key, value] of map) {
    console.log(key, value);
}