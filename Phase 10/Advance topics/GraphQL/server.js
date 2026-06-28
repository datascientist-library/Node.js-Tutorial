const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

// Define Schema
const schema = buildSchema(`
  type User {
    id: Int
    name: String
    email: String
    age: Int
  }

  type Query {
    hello: String
    getUser(id: Int!): User
    getAllUsers: [User]
  }
`);

// Fake database 
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 28 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 34 },
  { id: 3, name: 'Carol', email: 'carol@example.com', age: 25 }
];


const root = {
  hello: () => 'Hello from GraphQL!',
  getUser: ({ id })  => users.find(u => u.id === id) || null,
  getAllUsers: () => users
};

// Mount GraphQL endpoint 
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql:  true   
}));

app.listen(3000, () =>
  console.log('GraphQL server on http://localhost:3000/graphql')
);


// OUTPUT

// Query 1: hello
// {
//   "data": {
//     "hello": "Hello from GraphQL!"
//   }
// }


// Query 2: get one user
// {
//   "data": {
//     "getUser": {
//       "id":    1,
//       "name":  "Alice",
//       "email": "alice@example.com"
//     }
//   }
// }


// Query 3: all users
// {
//   "data": {
//     "getAllUsers": [
//       { "name": "Alice", "age": 28 },
//       { "name": "Bob",   "age": 34 },
//       { "name": "Carol", "age": 25 }
//     ]
//   }
// }