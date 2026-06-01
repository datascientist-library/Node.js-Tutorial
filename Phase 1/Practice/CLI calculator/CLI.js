const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter first number: ', (num1) => {

  rl.question('Enter operator (+, -, *, /): ', (operator) => {

    rl.question('Enter second number: ', (num2) => {

      num1 = Number(num1);
      num2 = Number(num2);

      let result;

      switch(operator) {
        case '+':
          result = num1 + num2;
          break;

        case '-':
          result = num1 - num2;
          break;

        case '*':
          result = num1 * num2;
          break;

        case '/':
          result = num1 / num2;
          break;

        default:
          console.log('Invalid operator');
          rl.close();
          return;
      }

      console.log(`Result: ${result}`);

      rl.close();
    });
  });
});