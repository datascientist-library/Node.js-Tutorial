const express    = require('express');
const promClient = require('prom-client');

const app = express();

// Create a Counter 
const requestCount = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests received'
});

// Routes
app.get('/hello', (req, res) => {
  requestCount.inc();  
  res.send('Hello World!');
});

// /metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.send(await promClient.register.metrics());
});

app.listen(3000, () => console.log('Server running on port 3000'));


// OUTPUT

// # HELP http_requests_total Total number of HTTP requests received
// # TYPE http_requests_total counter
// http_requests_total 3