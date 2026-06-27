const EventEmitter = require('events');

// A central event bus - the only thing all parts share
const bus = new EventEmitter();

// LISTENERS

bus.on('user:registered', (user) => {
  console.log(`[EmailService] Sending welcome email to ${user.email}`);
});

bus.on('user:registered', (user) => {
  console.log(`[AuditService] Logged new registration for user #${user.id}`);
});

bus.on('order:placed', (order) => {
  console.log(`[Notification] Notifying user #${order.userId} — order #${order.id} confirmed`);
});

bus.on('order:placed', (order) => {
  console.log(`[Inventory] Reserving stock for: ${order.product}`);
});

bus.on('order:placed', (order) => {
  console.log(`[Payment] Charging $${order.amount} to card on file`);
});

bus.on('user:registered', (data) => console.log(`[Logger] EVENT user:registered ->`, JSON.stringify(data)));
bus.on('order:placed', (data) => console.log(`[Logger] EVENT order:placed ->`, JSON.stringify(data)));

// EMITTERS

function registerUser(user) {
  console.log(`\n[ACTION] User registered: ${user.name}`);
  bus.emit('user:registered', user);
}

function placeOrder(order) {
  console.log(`\n[ACTION] Order placed: #${order.id}`);
  bus.emit('order:placed', order);
}

// RUN

registerUser({ id: 1, name: 'Zach', email: 'zach@example.com'});

placeOrder({ id: 101, userId: 1, product: 'Node.js Course', amount: '49.00'});


// Adding a new listener at runtime - zero changes to existing code

console.log('\nAdding a new RewardsService listener at runtime...');
bus.on('order:placed', (order) => {
  console.log(`  [RewardsService] Adding 49 reward points for user #${order.userId}`);
});

placeOrder({ id: 102, userId: 1, product: 'Redis Deep Dive', amount: '39.00' });

// OUTPUT

// [ACTION] User registered: Zach
// [EmailService] Sending welcome email to zach@example.com
// [AuditService] Logged new registration for user #1
// [Logger] EVENT user:registered -> {"id":1,"name":"Zach","email":"zach@example.com"}

// [ACTION] Order placed:101
// [Notification] Notifying user #1 — order 101 confirmed
// [Inventory] Reserving stock for: Node.js Course
// [Payment] Charging $49.00 to card on file
// [Logger] EVENT order:placed    -> {"id":101,"userId":1,"product":"Node.js Course","amount":"49.00"}

// Adding a new RewardsService listener at runtime...

// [ACTION] Order placed: 102
// [Notification] Notifying user #1 — order 102 confirmed
// [Inventory] Reserving stock for: Redis Deep Dive
// [Payment] Charging $39.00 to card on file
// [Logger] EVENT order:placed -> {"id":102,"userId":1,"product":"Redis Deep Dive","amount":"39.00"}
// [RewardsService] Adding 49 reward points for user #1