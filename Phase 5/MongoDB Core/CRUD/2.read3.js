// Filter by category
db.products.find({ category: "Electronics" })

// Output
// [
//   {
//     "_id": ObjectId("1"),
//     "name": "Wireless Mouse",
//     "price": 799,
//     "category": "Electronics",
//     "stock": 120,
//     "ratings": 4.5
//   },
//   {
//     "_id": ObjectId("2"),
//     "name": "Mechanical Keyboard",
//     "price": 2499,
//     "category": "Electronics",
//     "stock": 80,
//     "ratings": 4.8
//   }
// ]