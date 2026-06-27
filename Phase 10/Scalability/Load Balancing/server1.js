const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({
    message: 'Hello from Server 1!',
    server: 'Server 1',
    port: 3001
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', server: 'Server 1' });
});

app.listen(3001, () => console.log('Server 1 running on port 3001'));