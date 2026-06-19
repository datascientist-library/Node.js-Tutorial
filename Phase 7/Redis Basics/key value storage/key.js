// npm install redis

const redis = require('redis');

async function main() {
  // Connect to redis
  const client = redis.createClient();
  client.on('error', (err) => console.error('Redis Client Error', err));
  await client.connect();

  // Set a key-value pair
  await client.set('username', 'zach');
  console.log('SET username - zach');

  const value = await client.get('username');
  console.log('GET username -', value);

  // Set with expiry
  await client.set('session:101', 'active', { EX: 10 });
  console.log('SET session:101 - active (expires in 10s)');

  const exists = await client.exists('username');
  console.log('EXISTS username -', exists); 

  // update a value
  await client.set('username', 'zach_updated');
  console.log('SET username - zach_updated (overwrite)');
  console.log('GET username -', await client.get('username'));

  // delete a key
  const deleted = await client.del('username');
  console.log('DEL username - removed:', deleted); 

  const afterDelete = await client.get('username');
  console.log('GET username (after delete) -', afterDelete); 

  await client.quit();
}

main();


// OUTPUT

// SET username - zach
// GET username - zach
// SET session:101 - active (expires in 10s)
// EXISTS username - 1
// SET username - zach_updated (overwrite)
// GET username - zach_updated
// DEL username - removed: 1
// GET username (after delete) - null