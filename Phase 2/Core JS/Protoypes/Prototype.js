// Every JavaScript object has a hidden link to another object called its prototype

const person = {
  name: "Harry"
};

console.log(person.name);   
console.log(person.toString()); 

// Prototype chain

const person = {
  name: "Harry"
};

console.log(person.toString());

// Creating object with prototype

const animal = {
  eat() {
    console.log("Eating...");
  }
};

const dog = Object.create(animal);

dog.bark = function () {
  console.log("Woof!");
};

dog.bark();
dog.eat();