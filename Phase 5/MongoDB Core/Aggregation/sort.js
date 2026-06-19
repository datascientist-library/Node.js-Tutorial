// [
//   { "name": "Mouse", "category": "Electronics", "price": 800, "stock": 10 },
//   { "name": "Keyboard", "category": "Electronics", "price": 2000, "stock": 5 },
//   { "name": "Laptop", "category": "Computers", "price": 50000, "stock": 2 },
//   { "name": "Monitor", "category": "Electronics", "price": 10000, "stock": 3 }
// ]

// Sorted by Revenue (Descending)

db.products.aggregate([
  {
    $group: {
      _id: "$category",
      revenue: {
        $sum: { $multiply: ["$price", "$stock"] }
      }
    }
  },
  { $sort: { revenue: -1 } }
])

// Output

// [
//   { "_id": "Computers", "revenue": 100000 },
//   { "_id": "Electronics", "revenue": 48000 }
// ]