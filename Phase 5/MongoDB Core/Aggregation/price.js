// [
//   { "name": "Mouse", "category": "Electronics", "price": 800, "stock": 10 },
//   { "name": "Keyboard", "category": "Electronics", "price": 2000, "stock": 5 },
//   { "name": "Laptop", "category": "Computers", "price": 50000, "stock": 2 },
//   { "name": "Monitor", "category": "Electronics", "price": 10000, "stock": 3 }
// ]

// Avg Price per Category

db.products.aggregate([
  {
    $group: {
      _id: "$category",
      avgPrice: { $avg: "$price" }
    }
  }
])

// Output

// [
//   { "_id": "Electronics", "avgPrice": 4266.67 },
//   { "_id": "Computers", "avgPrice": 50000 }
// ]