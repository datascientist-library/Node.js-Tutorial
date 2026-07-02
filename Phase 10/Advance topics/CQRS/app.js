const express = require('express');
const app = express();
app.use(express.json());

// WRITE side 
const writeStore = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 28 },
  { id: 2, name: 'Bob',   email: 'bob@example.com',   age: 34 }
];

// READ side 
let readStore = [
  { id: 1, displayName: 'Alice (28)', email: 'alice@example.com', tag: 'Senior' },
  { id: 2, displayName: 'Bob (34)',   email: 'bob@example.com',   tag: 'Expert' }
];

let nextId = 3;


// Command - Create User 
app.post('/commands/create-user', (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: 'name, email, age required' });
  }

  // write to write store
  const user = { id: nextId++, name, email, age };
  writeStore.push(user);
  console.log(`COMMAND: CreateUser - ${name}`);

  // sync read store
  const tag = age >= 30 ? 'Expert' : 'Senior';
  readStore.push({
    id: user.id,
    displayName: `${name} (${age})`,
    email,
    tag
  });

  res.status(201).json({
    message: 'User created',
    commandId: `cmd_${Date.now()}`,
    userId: user.id
  });
});


// Command - Update User
app.put('/commands/update-user/:id', (req, res) => {
  const id   = parseInt(req.params.id);
  const { name, age } = req.body;

  // update write store
  const user = writeStore.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (name) user.name = name;
  if (age)  user.age  = age;
  console.log(`COMMAND: UpdateUser - id ${id}`);

  // sync read store
  const readUser = readStore.find(u => u.id === id);
  if (readUser) {
    readUser.displayName = `${user.name} (${user.age})`;
    readUser.tag = user.age >= 30 ? 'Expert' : 'Senior';
  }

  res.json({
    message: 'User updated',
    commandId: `cmd_${Date.now()}`
  });
});

// Command - Delete User
app.delete('/commands/delete-user/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // delete from write store
  const index = writeStore.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  writeStore.splice(index, 1);
  console.log(`COMMAND: DeleteUser - id ${id}`);

  // sync read store
  const readIndex = readStore.findIndex(u => u.id === id);
  if (readIndex !== -1) readStore.splice(readIndex, 1);

  res.json({
    message: 'User deleted',
    commandId: `cmd_${Date.now()}`
  });
});


// QUERIES (Read side)

// Get all users 
app.get('/queries/users', (req, res) => {
  console.log('QUERY: GetAllUsers');
  res.json({
    source: 'read-store',
    count:  readStore.length,
    users:  readStore
  });
});


// Get user by ID 
app.get('/queries/users/:id', (req, res) => {
  const id   = parseInt(req.params.id);
  const user = readStore.find(u => u.id === id);
  console.log(`QUERY: GetUser - id ${id}`);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ source: 'read-store', user });
});

// Search users by tag 
app.get('/queries/users/tag/:tag', (req, res) => {
  const tag     = decodeURIComponent(req.params.tag);
  const results = readStore.filter(u => u.tag === tag);
  console.log(`QUERY: SearchByTag - "${tag}"`);
  res.json({ source: 'read-store', count: results.length, users: results });
});

app.listen(3000, () => {
  console.log('CQRS server on http://localhost:3000');
  console.log('Commands : POST/PUT/DELETE /commands/*');
  console.log('Queries  : GET /queries/*\n');
});


// OUTPUT

// CQRS server on http://localhost:3000
// Commands : POST/PUT/DELETE /commands/*
// Queries  : GET /queries/*

// COMMAND: CreateUser - Carol
// COMMAND: UpdateUser - id 1
// COMMAND: DeleteUser - id 2
// QUERY: GetAllUsers
// QUERY: GetUser - id 1


// POST /commands/create-user
// {
//   "message":   "User created",
//   "commandId": "cmd_1705312981123",
//   "userId":    3
// }


// PUT /commands/update-user/1
// {
//   "message":   "User updated",
//   "commandId": "cmd_1705312981456"
// }


// DELETE /commands/delete-user/2
// {
//   "message":   "User deleted",
//   "commandId": "cmd_1705312981789"
// }


// GET /queries/users
// {
//   "source": "read-store",
//   "count":  2,
//   "users": [
//     { "id": 1, "displayName": "Alice Smith (31)", "email": "alice@example.com", "tag": "Expert" },
//     { "id": 3, "displayName": "Carol (25)",        "email": "carol@example.com", "tag": "Senior" }
//   ]
// }

// GET /queries/users/1
// {
//   "source": "read-store",
//   "user": {
//     "id":          1,
//     "displayName": "Alice Smith (31)",
//     "email":       "alice@example.com",
//     "tag":         "Expert"
//   }
// }