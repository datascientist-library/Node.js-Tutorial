// [
//   {
//     "_id": 1,
//     "name": "Wireless Mouse",
//     "price": 799,
//     "category": "Electronics",
//     "stock": 120,
//     "tags": ["computer", "accessory", "wireless"]
//   },
//   {
//     "_id": 2,
//     "name": "Mechanical Keyboard",
//     "price": 2499,
//     "category": "Electronics",
//     "stock": 80,
//     "tags": ["keyboard", "mechanical"]
//   },
//   {
//     "_id": 3,
//     "name": "Gaming Laptop",
//     "price": 85999,
//     "category": "Computers",
//     "stock": 30,
//     "tags": ["gaming", "laptop"]
//   }
// ]


// Using $push
db.products.updateOne(
  { name: "Wireless Mouse" },
  { $push: { tags: "new" } }
)


// Output

// [
//   {
//     "_id": 1,
//     "name": "Wireless Mouse",
//     "price": 799,
//     "category": "Electronics",
//     "stock": 120,
//     "tags": ["computer", "accessory", "wireless", "new"]
//   },
//   {
//     "_id": 2,
//     "name": "Mechanical Keyboard",
//     "price": 2499,
//     "category": "Electronics",
//     "stock": 80,
//     "tags": ["keyboard", "mechanical"]
//   },
//   {
//     "_id": 3,
//     "name": "Gaming Laptop",
//     "price": 85999,
//     "category": "Computers",
//     "stock": 30,
//     "tags": ["gaming", "laptop"]
//   }
// ]

