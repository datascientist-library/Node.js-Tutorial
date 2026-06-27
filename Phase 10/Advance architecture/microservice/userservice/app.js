const express = require('express');
const app     = express();
app.use(express.json());

// Fake user database
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob',   email: 'bob@example.com'   }
];

// Get user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(user);
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'user-service' });
});

app.listen(3001, () => console.log('👤 User Service running on port 3001'));