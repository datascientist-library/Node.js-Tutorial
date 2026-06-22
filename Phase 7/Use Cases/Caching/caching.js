const redis = require('redis');

// Simulates a slow database query
async function fetchFromDatabase(userId) {
  console.log(`  [DB] Querying database for user ${userId}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { id: userId, name: 'Zach', role: 'student', course: 'Node.js' };
}

async function getUserById(client, userId) {
  const cacheKey = `user:${userId}`;

  // Try cache first
  const cached = await client.get(cacheKey);
  if (cached) {
    console.log('  [Cache] HIT - returning from Redis');
    return JSON.parse(cached);
  }

  // Cache miss
  console.log('  [Cache] MISS - going to database');
  const user = await fetchFromDatabase(userId);

  // Store in cache with TTL
  await client.set(cacheKey, JSON.stringify(user), { EX: 30 });
  console.log('  [Cache] Stored result in Redis (TTL: 30s)');

  return user;
}

async function main() {
  const client = redis.createClient();
  client.on('error', (err) => console.error('Redis Client Error', err));
  await client.connect();

  await client.del('user:42'); 

  console.log('Request 1: first time fetching user 42');
  const start1 = Date.now();
  const user1 = await getUserById(client, 42);
  console.log(`  Result: ${JSON.stringify(user1)}`);
  console.log(`  Time taken: ${Date.now() - start1}ms\n`);

  console.log('Request 2: same user, served from cache');
  const start2 = Date.now();
  const user2 = await getUserById(client, 42);
  console.log(`  Result: ${JSON.stringify(user2)}`);
  console.log(`  Time taken: ${Date.now() - start2}ms\n`);

  const ttl = await client.ttl('user:42');
  console.log(`Cache TTL remaining for user:42 - ${ttl}s`);

  await client.quit();
}

main();

// OUTPUT
// Request 1: first time fetching user 42
//   [Cache] MISS - going to database
//   [DB] Querying database for user 42
//   [Cache] Stored result in Redis (TTL: 30s)
//   Result: {"id":42,"name":"Zach","role":"student","course":"Node.js"}
//   Time taken: 2003ms

// Request 2: same user, served from cache
//   [Cache] HIT - returning from Redis
//   Result: {"id":42,"name":"Zach","role":"student","course":"Node.js"}
//   Time taken: 2ms

// Cache TTL remaining for user:42 - 30s