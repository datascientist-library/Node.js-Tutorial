// Fake API call that fails 2 times then succeeds

let attemptCount = 0;

function fakeApiCall() {
  return new Promise((resolve, reject) => {
    attemptCount++;
    console.log(`Attempt ${attemptCount}...`);

    if (attemptCount < 3) {
      reject(new Error('Network error - server unavailable'));
    } else {
      resolve({ data: 'Success! Got the data.' });
    }
  });
}

// Basic Retry with Fixed Delay
async function retryFixed(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await fn();
      return result;  
    } catch (err) {
      console.log(`Failed: ${err.message}`);

      if (i < retries - 1) {
        console.log(`Waiting ${delay}ms before next retry...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  throw new Error('All retries exhausted');
}

// Run it
async function main() {
  console.log('Calling API with fixed retry (1s delay)...\n');
  try {
    const result = await retryFixed(fakeApiCall, 3, 1000);
    console.log('\nFinal Result:', result.data);
  } catch (err) {
    console.error('\nGave up:', err.message);
  }
}

main();


// OUTPUT

// Calling API with fixed retry (1s delay)...

// Attempt 1...
// Failed: Network error - server unavailable
// Waiting 1000ms before next retry...

// Attempt 2...
// Failed: Network error - server unavailable
// Waiting 1000ms before next retry...

// Attempt 3...

// Final Result: Success! Got the data.