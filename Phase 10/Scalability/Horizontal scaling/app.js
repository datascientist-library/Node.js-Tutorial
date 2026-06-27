const cluster = require('cluster');
const express = require('express');
const os      = require('os');

const totalCPUs = os.cpus().length;

// PRIMARY PROCESS
if (cluster.isPrimary) {
  console.log(`Primary process started  (PID: ${process.pid})`);
  console.log(`Spawning ${totalCPUs} workers for ${totalCPUs} CPUs...\n`);

  // fork one worker per CPU core
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  // log when a worker comes online
  cluster.on('online', worker => {
    console.log(`Worker ${worker.id} online (PID: ${worker.process.pid})`);
  });

  // restart worker if it crashes
  cluster.on('exit', (worker, code) => {
    console.log(`Worker ${worker.id} died (PID: ${worker.process.pid})`);
    console.log(`Restarting worker...`);
    cluster.fork();
  });


// WORKER PROCESS
} else {
  const app = express();

  app.get('/hello', (req, res) => {
    res.json({
      message: 'Hello World!',
      worker: cluster.worker.id,
      pid: process.pid   
    });
  });

  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      worker: cluster.worker.id,
      pid: process.pid
    });
  });

  app.listen(3000, () => {
    console.log(`Worker ${cluster.worker.id} listening on port 3000`);
  });
}


// OUTPUT

// Terminal 1
// Primary process started  (PID: 12345)
// Spawning 4 workers for 4 CPUs...

// Worker 1 online (PID: 12346)
// Worker 2 online (PID: 12347)
// Worker 3 online (PID: 12348)
// Worker 4 online (PID: 12349)
// Worker 1 listening on port 3000
// Worker 2 listening on port 3000
// Worker 3 listening on port 3000
// Worker 4 listening on port 3000


// Terminal 2
// { "message": "Hello World!", "worker": 1, "pid": 12346 }
// { "message": "Hello World!", "worker": 2, "pid": 12347 }
// { "message": "Hello World!", "worker": 3, "pid": 12348 }
// { "message": "Hello World!", "worker": 4, "pid": 12349 }