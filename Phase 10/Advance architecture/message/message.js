const { createClient } = require('redis');

const STREAM = 'orders:stream';
const GROUP  = 'order-processors';

async function main() {
  const producer = createClient();
  const consumer = createClient();

  await producer.connect();
  await consumer.connect();

  await producer.del(STREAM);

  // Create a consumer group on the stream

  await consumer.xGroupCreate(STREAM, GROUP, '$', { MKSTREAM: true });
  console.log(`Consumer group "${GROUP}" created on "${STREAM}"\n`);


  // producer publish messages 
  console.log('Producer: publishing 3 orders');

  const id1 = await producer.xAdd(STREAM, '*', { orderId: '101', product: 'Node.js Course', amount: '49.00' });
  console.log(`Published order 101 - stream ID: ${id1}`);

  const id2 = await producer.xAdd(STREAM, '*', { orderId: '102', product: 'Redis Deep Dive', amount: '39.00' });
  console.log(`Published order 102 - stream ID: ${id2}`);

  const id3 = await producer.xAdd(STREAM, '*', { orderId: '103', product: 'MongoDB Guide', amount: '29.00' });
  console.log(`Published order 103 - stream ID: ${id3}`);

  console.log(`\n  Stream length: ${await producer.xLen(STREAM)} messages\n`);


  // consumer read and process messages
  console.log('Consumer: reading messages');

  const messages = await consumer.xReadGroup(GROUP, 'consumer-1', [
    { key: STREAM, id: '>' }
  ], { COUNT: 10 });

  for (const stream of messages) {
    for (const msg of stream.messages) {
      const { orderId, product, amount } = msg.message;
      console.log(`\n  Processing message ID : ${msg.id}`);
      console.log(`Order ${orderId}: ${product} ($${amount})`);

      await new Promise((r) => setTimeout(r, 200));


      await consumer.xAck(STREAM, GROUP, msg.id);
      console.log(`ACK'd message ID: ${msg.id}`);
    }
  }

  // Check pending messages
  const pending = await consumer.xPending(STREAM, GROUP);
  console.log(`\nUnacknowledged messages: ${pending.pending}`);

  await producer.quit();
  await consumer.quit();
}

main();


// OUTPUT:

// Consumer group "order-processors" created on "orders:stream"

// Producer: publishing 3 orders
// Published order 101 - stream ID: 1782584339525-0
// Published order 102 - stream ID: 1782584339526-0
// Published order 103 - stream ID: 1782584339527-0

//   Stream length: 3 messages

// Consumer: reading messages

//   Processing message ID : 1782584339525-0
//   Order 101 : Node.js Course ($49.00)
//   ACK'd message ID : 1782584339525-0 

//   Processing message ID : 1782584339526-0
//   Order 102 : Redis Deep Dive ($39.00)
//   ACK'd message ID : 1782584339526-0 

//   Processing message ID : 1782584339527-0
//   Order 103 : MongoDB Guide ($29.00)
//   ACK'd message ID : 1782584339527-0 

//   Unacknowledged messages: 0