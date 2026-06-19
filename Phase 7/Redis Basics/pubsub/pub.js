const redis = require('redis');

async function main() {
  const publisher = redis.createClient();
  publisher.on('error', (err) => console.error('Publisher Error', err));

  await publisher.connect();

  const r1 = await publisher.publish('notifications', 'New user signed up: zach');
  console.log('Published "New user signed up: zach" - delivered to', r1, 'subscriber(s)');

  const r2 = await publisher.publish('notifications', 'New order placed: 1234');
  console.log('Published "New order placed: 1234" - delivered to', r2, 'subscriber(s)');

  await publisher.quit();
}

main();

// OUTPUT

// Published "New user signed up: zach" - delivered to 1 subscriber(s)
// Published "New order placed: 1234" - delivered to 1 subscriber(s)