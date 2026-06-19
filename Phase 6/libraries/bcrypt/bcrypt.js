const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

async function run() {

  const password = "mypassword123";


  // STEP 1 — Hash the password
  
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  console.log("Original :", password);
  console.log("Hashed   :", hash);


  // STEP 2 — Compare correct password

  const correctMatch = await bcrypt.compare("mypassword123", hash);
  console.log("\nCorrect password match:", correctMatch);


  // STEP 3 — Compare wrong password

  const wrongMatch = await bcrypt.compare("wrongpassword", hash);
  console.log("Wrong password match  :", wrongMatch);


  // STEP 4 — Same password, different hash

  const hash2 = await bcrypt.hash(password, SALT_ROUNDS);
  console.log("\nHash 1:", hash);
  console.log("Hash 2:", hash2);
  console.log("Same?  :", hash === hash2);
}

run();


// OUTPUT

// Original :  mypassword123
// Hashed   :  $2b$10$N9qo8uLOickgx2Z...

// Correct password match: true
// Wrong password match  : false

// Hash 1: $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
// Hash 2: $2b$10$X7Gp3kLmNqRs9vWyTuIoZeAhBcDeFgHiJkLmNoPqRsTuVwXyZaB1C
// Same?  : false