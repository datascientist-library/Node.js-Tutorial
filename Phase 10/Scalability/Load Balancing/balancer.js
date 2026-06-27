const express = require('express');
const http = require('http');
const app = express();


// List of backend servers
const servers = [
  { host: 'localhost', port: 3001, name: 'Server 1' },
  { host: 'localhost', port: 3002, name: 'Server 2' },
  { host: 'localhost', port: 3003, name: 'Server 3' }
];

let currentIndex = 0;

// pick next server 
function getNextServer() {
  const server  = servers[currentIndex];
  currentIndex  = (currentIndex + 1) % servers.length;
  return server;
}

// Forward request to chosen server
function forwardRequest(server, path) {
  return new Promise((resolve, reject) => {
    http.get(`http://${server.host}:${server.port}${path}`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end',  ()    => resolve({
        status: res.statusCode,
        body:   JSON.parse(data)
      }));
    }).on('error', reject);
  });
}

// Load Balanced Route
app.get('/hello', async (req, res) => {
  const server = getNextServer();
  console.log(`Forwarding to ${server.name} (port ${server.port})`);

  try {
    const { status, body } = await forwardRequest(server, '/hello');
    res.status(status).json({
      ...body,
      balancer: `Routed to ${server.name}`
    });
  } catch (err) {
    res.status(502).json({ error: `${server.name} unavailable` });
  }
});

// Health check for all servers
app.get('/health', async (req, res) => {
  const results = await Promise.allSettled(
    servers.map(s => forwardRequest(s, '/health'))
  );

  const report = servers.map((s, i) => ({
    server: s.name,
    port: s.port,
    status: results[i].status === 'fulfilled' ? 'ok' : 'down'
  }));

  res.status(200).json({ balancer: 'ok', servers: report });
});

app.listen(3000, () => {
  console.log('Load Balancer running on port 3000');
  console.log('Strategy: Round Robin\n');
});


// OUTPUT

// Server 1 running on port 3001
// Server 2 running on port 3002
// Server 3 running on port 3003
// Load Balancer running on port 3000
// Strategy: Round Robin

// Forwarding to Server 1 (port 3001)
// Forwarding to Server 2 (port 3002)
// Forwarding to Server 3 (port 3003)
// Forwarding to Server 1 (port 3001)
// Forwarding to Server 2 (port 3002)
// Forwarding to Server 3 (port 3003)