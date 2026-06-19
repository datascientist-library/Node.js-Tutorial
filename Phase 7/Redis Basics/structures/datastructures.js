const redis = require('redis');

async function main() {
  const client = redis.createClient();
  client.on('error', (err) => console.error('Redis Client Error', err));
  await client.connect();

  // List
  await client.del('recent_logins');
  await client.rPush('recent_logins', 'zach');
  await client.rPush('recent_logins', 'amy');
  await client.lPush('recent_logins', 'sam'); 
  console.log('LIST: recent_logins');
  console.log('LRANGE recent_logins 0 -1 -', await client.lRange('recent_logins', 0, -1));
  console.log('LLEN recent_logins -', await client.lLen('recent_logins'));

  // Hash
  await client.del('user:1');
  await client.hSet('user:1', {
    name: 'Zach',
    role: 'student',
    course: 'Node.js',
  });
  console.log('\nHASH: user:1');
  console.log('HGETALL user:1 -', await client.hGetAll('user:1'));
  console.log('HGET user:1 name -', await client.hGet('user:1', 'name'));

  // Set
  await client.del('skills');
  await client.sAdd('skills', ['javascript', 'nodejs', 'mongodb']);
  await client.sAdd('skills', 'javascript'); 
  console.log('\nSET: skills');
  console.log('SMEMBERS skills -', await client.sMembers('skills'));
  console.log('SISMEMBER skills "nodejs" -', await client.sIsMember('skills', 'nodejs'));
  console.log('SCARD skills (count) -', await client.sCard('skills'));

  // Sorted set
  await client.del('leaderboard');
  await client.zAdd('leaderboard', [
    { score: 90, value: 'zach' },
    { score: 75, value: 'amy' },
    { score: 99, value: 'sam' },
  ]);
  console.log('\nSORTED SET: leaderboard');
  console.log('ZRANGE leaderboard 0 -1 (low-high) -', await client.zRange('leaderboard', 0, -1));
  console.log('ZRANGE REV (high-low) -', await client.zRange('leaderboard', 0, -1, { REV: true }));
  console.log('ZSCORE leaderboard "sam" -', await client.zScore('leaderboard', 'sam'));
  console.log('ZRANK leaderboard "amy" (0-indexed, low-high) -', await client.zRank('leaderboard', 'amy'));

  await client.quit();
}

main();


// OUTPUT

// LIST: recent_logins
// LRANGE recent_logins 0 -1 - [ 'sam', 'zach', 'amy' ]
// LLEN recent_logins - 3


// HASH: user:1
// HGETALL user:1 - { name: 'Zach', role: 'student', course: 'Node.js' }
// HGET user:1 name - Zach


// SET: skills
// SMEMBERS skills - [ 'javascript', 'mongodb', 'nodejs' ]
// SISMEMBER skills "nodejs" - 1
// SCARD skills (count) - 3


// SORTED SET: leaderboard
// ZRANGE leaderboard 0 -1 (low-high) - [ 'amy', 'zach', 'sam' ]
// ZRANGE REV (high-low) - [ 'sam', 'zach', 'amy' ]
// ZSCORE leaderboard "sam" - 99
// ZRANK leaderboard "amy" (0-indexed, low-high) - 0