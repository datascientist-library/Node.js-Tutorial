const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.url === '/file') {

        const readStream = fs.createReadStream('sample.txt');

        readStream.pipe(res);

    } else {

        res.writeHead(404);
        res.end('Route not found');
    }

});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Now visit http://localhost:3000/file