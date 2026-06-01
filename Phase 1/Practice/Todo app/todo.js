const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let todos = [];

function showMenu() {
  console.log('\n=== TODO APP ===');
  console.log('1. Add Task');
  console.log('2. View Tasks');
  console.log('3. Delete Task');
  console.log('4. Exit');

  rl.question('Choose an option: ', handleChoice);
}

function handleChoice(choice) {

  if (choice === '1') {

    rl.question('Enter task: ', (task) => {
      todos.push(task);
      console.log('Task added!');
      showMenu();
    });

  } else if (choice === '2') {

    console.log('\nTasks:');

    todos.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });

    showMenu();

  } else if (choice === '3') {

    rl.question('Enter task number to delete: ', (num) => {

      todos.splice(num - 1, 1);

      console.log('Task deleted!');
      showMenu();
    });

  } else if (choice === '4') {

    console.log('Stopped Successfully');
    rl.close();

  } else {

    console.log('Invalid choice');
    showMenu();
  }
}

showMenu();
