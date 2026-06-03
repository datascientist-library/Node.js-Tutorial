// A closure is created when a function remembers and can access variables from its outer (lexical) scope, even after the outer function has finished executing.

// Example

function outer() {
  let name = "Harry";

  function inner() {
    console.log(name);
  }

  return inner;
}

const greet = outer();
greet();

// Example Bank Account

function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
    },

    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);

account.deposit(500);

console.log(account.getBalance());

// Multiple Closures

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1());
console.log(counter1());

console.log(counter2());
console.log(counter2());