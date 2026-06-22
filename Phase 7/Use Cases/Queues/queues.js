const { createClient } = require('redis');

async function main() {
  const producer = createClient();
  const consumer = createClient();

  await producer.connect();
  await consumer.connect();

  await producer.del('jobs');

  // PRODUCER
  console.log('Producer: adding jobs to queue');
  const jobs = [
    { id: 1, task: 'send_welcome_email', user: 'zach' },
    { id: 2, task: 'resize_image', file: 'avatar.png' },
    { id: 3, task: 'generate_report', month: 'June' },
    { id: 4, task: 'send_invoice', amount: '$49.00' },
  ];

  for (const job of jobs) {
    await producer.lPush('jobs', JSON.stringify(job));
    console.log(`  Pushed - ${JSON.stringify(job)}`);
  }

  const queueLength = await producer.lLen('jobs');
  console.log(`\nQueue length: ${queueLength} jobs waiting\n`);

  // CONSUMER
  console.log('Consumer: processing jobs');
  while (true) {
    const raw = await consumer.rPop('jobs');
    if (!raw) {
      console.log('\nQueue is empty - nothing left to process');
      break;
    }

    const job = JSON.parse(raw);
    console.log(`  Processing job #${job.id}: ${job.task}`);
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`  Done with job #${job.id}`);
  }

  const remaining = await consumer.lLen('jobs');
  console.log(`\nJobs remaining in queue: ${remaining}`);

  await producer.quit();
  await consumer.quit();
}

main();


// OUTPUT

// Producer: adding jobs to queue
//   Pushed - {"id":1,"task":"send_welcome_email","user":"zach"}
//   Pushed - {"id":2,"task":"resize_image","file":"avatar.png"}
//   Pushed - {"id":3,"task":"generate_report","month":"June"}
//   Pushed - {"id":4,"task":"send_invoice","amount":"$49.00"}

// Queue length: 4 jobs waiting

// Consumer: processing jobs
//   Processing job #1: send_welcome_email
//   Done with job #1
//   Processing job #2: resize_image
//   Done with job #2
//   Processing job #3: generate_report
//   Done with job #3
//   Processing job #4: send_invoice
//   Done with job #4

// Queue is empty - nothing left to process

// Jobs remaining in queue: 0