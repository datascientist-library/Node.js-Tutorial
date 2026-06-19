// Using comparison operator
db.products.find({ price: { $gte: 1000, $lte: 50000 } })

// Output

// [
//   {
//     "_id": ObjectId("2"),
//     "name": "Mechanical Keyboard",
//     "price": 2499,
//     "category": "Electronics",
//     "stock": 80,
//     "ratings": 4.8
//   }
// ]