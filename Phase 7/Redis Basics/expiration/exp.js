const redis = require('redis');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const client = redis.createClient();
  client.on('error', (err) => console.error('Redis Client Error', err));
  await client.connect();

  // SET a key with a 3-second expiry
  await client.set('otp:1234', '7890', { EX: 3 });
  console.log('SET otp:1234 - 7890 (expires in 3s)');

  // Check remaining time-to-live (in seconds)
  let ttl = await client.ttl('otp:1234');
  console.log('TTL otp:1234 -', ttl, 'seconds left');

  // get it right away 
  console.log('GET otp:1234 -', await client.get('otp:1234'));

  // Wait 4 seconds (longer than the TTL)
  console.log('waiting 4 seconds for it to expire');
  await sleep(4000);

  ttl = await client.ttl('otp:1234');
  console.log('TTL otp:1234 -', ttl, '(-2 = key expired/does not exist)');

  // get after expiry - null
  console.log('GET otp:1234 -', await client.get('otp:1234'));

  // add expiry to an existing key using EXPIRE
  await client.set('temp:note', 'hello');
  console.log('\nSET temp:note - hello (no expiry yet)');
  console.log('TTL temp:note -', await client.ttl('temp:note'), '(-1 = no expiry set)');

  await client.expire('temp:note', 5);
  console.log('EXPIRE temp:note 5 - expiry added');
  console.log('TTL temp:note -', await client.ttl('temp:note'), 'seconds left');

  await client.quit();
}

main();

// OUTPUT

// SET otp:1234 - 7890 (expires in 3s)
// TTL otp:1234 - 3 seconds left
// GET otp:1234 - 7890
// waiting 4 seconds for it to expire
// TTL otp:1234 - -2 (-2 = key expired/does not exist)
// GET otp:1234 - null

// SET temp:note - hello (no expiry yet)
// TTL temp:note - -1 (-1 = no expiry set)
// EXPIRE temp:note 5 - expiry added
// TTL temp:note - 5 seconds left