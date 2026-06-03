// A stream is a way to process data piece by piece (chunks) instead of loading everything into memory at once.

// Example
const fs = require("fs");

fs.readFile("bigfile.txt", "utf8", (err, data) => {
    console.log(data);
});

// Readable
const fs = require("fs");

const stream = fs.createReadStream("file.txt", "utf8");

stream.on("data", (chunk) => {
    console.log("Chunk:", chunk);
});

stream.on("end", () => {
    console.log("Finished reading");
});

// Writable
const fs = require("fs");

const stream = fs.createWriteStream("output.txt");

stream.write("Hello\n");
stream.write("World\n");

stream.end();

