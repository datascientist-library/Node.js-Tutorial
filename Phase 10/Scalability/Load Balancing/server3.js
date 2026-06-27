const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({
    message: 'Hello from Server 3!',
    server: 'Server 3',
    port: 3003
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', server: 'Server 3' });
});

app.listen(3003, () => console.log('Server 3 running on port 3003'));