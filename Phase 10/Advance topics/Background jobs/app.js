const express = require('express');
const app = express();
app.use(express.json());

// Simple one-time background job
function runOneTimeJob() {
  console.log('One-time job scheduled');

  setTimeout(() => {
    console.log('One-time job ran! (after 3 seconds)');
    console.log('Task: Cleaned up temp files');
  }, 3000);
}

// Repeating background job 
function runRepeatingJob() {
  console.log('Repeating job started');

  setInterval(() => {
    const now = new Date().toLocaleTimeString();
    console.log(`Repeating job ran at ${now}`);
    console.log('Task: Checked for new emails');
  }, 5000);   
}

// Routes 
app.get('/start', (req, res) => {
  runOneTimeJob();
  runRepeatingJob();
  res.json({ message: 'Jobs started! Watch the terminal.'});
});

app.listen(3000, () =>
  console.log('Server on http://localhost:3000')
);


// OUTPUT

// Server on http://localhost:3000

// # after hitting /start
// One-time job scheduled
// Repeating job started

// # 3 seconds later
// One-time job ran! (after 3 seconds)
// Task: Cleaned up temp files

// # every 5 seconds after
// Repeating job ran at 10:23:05
// Task: Checked for new emails

// Repeating job ran at 10:23:10
// Task: Checked for new emails

// Repeating job ran at 10:23:15
// Task: Checked for new emails