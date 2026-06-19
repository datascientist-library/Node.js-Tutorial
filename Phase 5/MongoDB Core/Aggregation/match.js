// [
//   { "name": "Mouse", "category": "Electronics", "price": 800, "stock": 10 },
//   { "name": "Keyboard", "category": "Electronics", "price": 2000, "stock": 5 },
//   { "name": "Laptop", "category": "Computers", "price": 50000, "stock": 2 },
//   { "name": "Monitor", "category": "Electronics", "price": 10000, "stock": 3 }
// ]

// Match and Group

db.products.aggregate([
  { $match: { category: "Electronics" } },
  {
    $group: {
      _id: "$category",
      totalProducts: { $sum: 1 }
    }
  }
])

// Output

// [
//   { "_id": "Electronics", "totalProducts": 3 }
// ]