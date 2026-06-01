// 1. Creating object

const person = {
  name: "John",
  age: 25,
  city: "Mumbai"
};

console.log(person)

// 2. Accessing the object

console.log("Nme of the person:", person.name);
console.log("Age", person.age);

// 3. Bracket notation

console.log(person["city"]);

// 4. Looping through Object

const person2 = {
  name: "Gabriel",
  age: 21,
  city: "Sweden"
};

for (let key in person2) {
  console.log(key, person2[key]);
}