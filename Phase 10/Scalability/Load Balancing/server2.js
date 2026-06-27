const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({
    message: 'Hello from Server 2!',
    server: 'Server 2',
    port: 3002
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', server: 'Server 2' });
});

app.listen(3002, () => console.log('Server 2 running on port 3002'));