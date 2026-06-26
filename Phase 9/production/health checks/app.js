const express = require('express');
const app     = express();

// Fake database
const db = {
  isConnected: true,    
  ping() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.isConnected) resolve('pong');
        else reject(new Error('DB connection lost'));
      }, 50);
    });
  }
};

// Health Check with DB check
app.get('/health', async (req, res) => {
  const health = {
    status:    'ok',
    timestamp: new Date().toISOString(),
    uptime:    `${Math.floor(process.uptime())}s`,
    checks: {
      database: 'unknown'
    }
  };

  // check database
  try {
    await db.ping();
    health.checks.database = 'connected';
  } catch (err) {
    health.checks.database = `${err.message}`;
    health.status = 'degraded';    
  }

  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});

app.listen(3000, () => console.log('Server running on port 3000'));


// OUTPUT
// when connected (isConnected: true)

// {
//   "status":    "ok",
//   "timestamp": "2024-01-15T10:23:01.123Z",
//   "uptime":    "5s",
//   "checks": {
//     "database": "connected"
//   }
// }

// when disconnected (isConnected: false)

// {
//   "status":    "degraded",
//   "timestamp": "2024-01-15T10:23:01.123Z",
//   "uptime":    "5s",
//   "checks": {
//     "database": "DB connection lost"
//   }
// }