// Using comparison operator
db.products.find({ price: { $gt: 1000 } })

// Output

// [
//   {
//     "_id": ObjectId("2"),
//     "name": "Mechanical Keyboard",
//     "price": 2499,
//     "category": "Electronics"
//   },
//   {
//     "_id": ObjectId("3"),
//     "name": "Gaming Laptop",
//     "price": 85999,
//     "category": "Computers"
//   }
// ]