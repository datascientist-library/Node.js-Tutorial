const express = require('express');
const app = express();
app.use(express.json());


// Shared data
let data = { value: 'initial' };
let isHealthy = true;


// GET - always respond 
app.get('/data', (req, res) => {
  if (!isHealthy) {
    return res.json({
      value: data.value,
      node: 'available-node',
      warning: 'Data may be stale - network partition active',
      available: true
    });
  }
  res.json({ value: data.value, node: 'available-node', available: true });
});


// POST - accept writes even during partition 
app.post('/data', (req, res) => {
  data.value = req.body.value;
  res.json({
    updated: data.value,
    node: 'available-node',
    warning: isHealthy ? null : 'Written locally - may conflict later'
  });
});


// Toggle partition 
app.post('/partition/:state', (req, res) => {
  isHealthy = req.params.state === 'heal';
  res.json({
    partition: isHealthy ? 'healed' : 'active',
    node: 'available-node'
  });
});

app.listen(3002, () =>
  console.log('Available Node running on port 3002')
);


// OUTPUT

// During partition - available node:
// {
//   "value": "initial",
//   "node": "available-node",
//   "warning": "Data may be stale - network partition active",
//   "available": true
// }