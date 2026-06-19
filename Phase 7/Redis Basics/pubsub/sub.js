const redis = require('redis');

async function main() {
  const subscriber = redis.createClient();
  subscriber.on('error', (err) => console.error('Subscriber Error', err));

  await subscriber.connect();

  await subscriber.subscribe('notifications', (message) => {
    console.log('Received -', message);
  });

  console.log('Listening on "notifications"');
}

main();

// OUTPUT

// Listening on "notifications"
// Received - New user signed up: zach
// Received - New order placed: 1234