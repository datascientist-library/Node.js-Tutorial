// async and await are ES2017 features that make asynchronous code look and behave more like synchronous code.

// Example

async function getUser() {
  const user = await fetchUser();
  console.log(user);
}

getUser();

// Example

async function greet() {
  return "Hello";
}

console.log(greet());

// Await example
function fetchUser() {
  return Promise.resolve("Harry");
}

async function getUser() {
  const user = await fetchUser();

  console.log(user);
}

getUser();

// Example

function getUser() {
  return Promise.resolve("Harry");
}

function getPosts() {
  return Promise.resolve(["Post 1", "Post 2"]);
}

async function loadData() {
  const user = await getUser();
  const posts = await getPosts();

  console.log(user);
  console.log(posts);
}

loadData();