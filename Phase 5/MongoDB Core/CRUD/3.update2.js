// [
//   {
//     "_id": 1,
//     "name": "Wireless Mouse",
//     "price": 899,
//     "category": "Electronics",
//     "stock": 120
//   },
//   {
//     "_id": 2,
//     "name": "Mechanical Keyboard",
//     "price": 2499,
//     "category": "Electronics",
//     "stock": 80
//   },
//   {
//     "_id": 3,
//     "name": "Gaming Laptop",
//     "price": 85999,
//     "category": "Computers",
//     "stock": 30
//   }
// ]


// Update Many

db.products.updateMany(
  { category: "Electronics" },
  { $inc: { stock: 10 } }
)

// Output

// [
//   {
//     "_id": 1,
//     "name": "Wireless Mouse",
//     "price": 899,
//     "category": "Electronics",
//     "stock": 130
//   },
//   {
//     "_id": 2,
//     "name": "Mechanical Keyboard",
//     "price": 2499,
//     "category": "Electronics",
//     "stock": 90
//   },
//   {
//     "_id": 3,
//     "name": "Gaming Laptop",
//     "price": 85999,
//     "category": "Computers",
//     "stock": 30
//   }
// ]