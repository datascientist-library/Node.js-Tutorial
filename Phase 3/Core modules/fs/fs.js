// The fs module in Node.js is used to work with the file system—reading, writing, updating, deleting, and managing files and directories.

// Read a file

const fs = require("fs");

fs.readFile("file.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("Error reading file");
        return;
    }
    console.log(data);
});


// Write a file
const fs = require("fs");

fs.writeFile("file.txt", "Hello World", (err) => {
    if (err) {
        console.log("Error writing file");
        return;
    }
    console.log("File written successfully");
});

// Append to a file

const fs = require("fs");

fs.appendFile("file.txt", "\nNew line added", (err) => {
    if (err) {
        console.log("Error appending file");
        return;
    }
    console.log("Data added");
});