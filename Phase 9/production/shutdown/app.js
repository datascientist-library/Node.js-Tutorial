const express = require('express');
const app = express();

// A slow route
app.get('/slow', (req, res) => {
  setTimeout(() => {
    res.send('Slow response done!');
  }, 3000);            
});

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// Start server
const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// Graceful shutdown function
function gracefulShutdown(signal) {
  console.log(`\nReceived ${signal} - shutting down gracefully...`);

  server.close(() => {
    console.log('All requests finished - server closed');
    console.log('Goodbye!');
    process.exit(0);            
  });

  // force shutdown if takes too long
  setTimeout(() => {
    console.error('Timeout! Forcing shutdown...');
    process.exit(1);
  }, 5000);
}

// Listen for termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); 
process.on('SIGINT',  () => gracefulShutdown('SIGINT')); 


// OUTPUT

// Server started on port 3000

// Received SIGINT - shutting down gracefully...

// All requests finished - server closed
// Goodbye!