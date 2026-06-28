const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Serve client HTML
app.get('/', (req, res) => res.sendFile(__dirname + '/client.html'));

// WebSocket connection
wss.on('connection', (ws) => {
  console.log('Client connected');

  // send welcome message to client
  ws.send(JSON.stringify({
    type: 'welcome',
    message: 'Hello! You are connected to the server'
  }));

  // receive message from client
  ws.on('message', (data) => {
    const msg = JSON.parse(data);
    console.log(`Received: ${msg.text}`);

    ws.send(JSON.stringify({
      type: 'echo',
      message: `Server got: "${msg.text}"`,
      time: new Date().toISOString()
    }));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () =>
  console.log('Server running on http://localhost:3000')
);


// OUTPUT

// Terminal

// Server running on http://localhost:3000
// Client connected
// Received: Hello server!
// Received: How are you?
// Client disconnected


// Browser

// Connected to server
// Server: Hello! You are connected to the server
// You: Hello server!
// Server: Server got: "Hello server!"
// You: How are you?
// Server: Server got: "How are you?"