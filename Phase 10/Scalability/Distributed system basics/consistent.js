const express = require('express');
const app = express();
app.use(express.json());

// Shared data between nodes

let data = { value: 'initial' };
let isHealthy = true; 


// GET - only respond if consistent
app.get('/data', (req, res) => {
  if (!isHealthy) {
    return res.status(503).json({
      error: 'Node unavailable during network partition',
      reason: 'Choosing CONSISTENCY over AVAILABILITY',
      tip: 'Wait for partition to heal before reading'
    });
  }
  res.json({ value: data.value, node: 'consistent-node', consistent: true });
});


// POST - write data
app.post('/data', (req, res) => {
  if (!isHealthy) {
    return res.status(503).json({ error: 'Cannot write during partition' });
  }
  data.value = req.body.value;
  res.json({ updated: data.value, node: 'consistent-node' });
});


// Toggle partition
app.post('/partition/:state', (req, res) => {
  isHealthy = req.params.state === 'heal';
  res.json({
    partition: isHealthy ? 'healed' : 'active',
    node: 'consistent-node'
  });
});

app.listen(3001, () =>
  console.log('Consistent Node running on port 3001')
);


// OUTPUT

// Normal reads (no partition):

// { "value": "initial", "node": "consistent-node", "consistent": true  }
// { "value": "initial", "node": "available-node",  "available": true   }


// During partition - consistent node:
// {
//   "error": "Node unavailable during network partition",
//   "reason": "Choosing CONSISTENCY over AVAILABILITY",
//   "tip": "Wait for partition to heal before reading"
// }