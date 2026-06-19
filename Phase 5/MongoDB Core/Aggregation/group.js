// [
//   { "name": "Mouse", "category": "Electronics", "price": 800, "stock": 10 },
//   { "name": "Keyboard", "category": "Electronics", "price": 2000, "stock": 5 },
//   { "name": "Laptop", "category": "Computers", "price": 50000, "stock": 2 },
//   { "name": "Monitor", "category": "Electronics", "price": 10000, "stock": 3 }
// ]

// Group by Category
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      totalStock: { $sum: "$stock" }
    }
  }
])

// Output

// [
//   { "_id": "Electronics", "totalStock": 18 },
//   { "_id": "Computers", "totalStock": 2 }
// ]