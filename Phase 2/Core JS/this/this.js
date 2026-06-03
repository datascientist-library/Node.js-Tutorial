// The this keyword in JavaScript refers to the object that is executing the current function

// 1. Object method

const person = {
  name: "Harry",

  greet() {
    console.log(this.name);
  }
};

person.greet();

// 2. Constructor Function
function Person(name) {
  this.name = name;
}

const p1 = new Person("Harry");

console.log(p1.name);

// 3. Arrow function

const person = {
  name: "Harry",

  greet() {
    const arrow = () => {
      console.log(this.name);
    };

    arrow();
  }
};

person.greet();