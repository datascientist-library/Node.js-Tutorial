db.users.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "orders"
    }
  }
])


// Output

// {
//   "_id": 101,
//   "name": "John Doe",
//   "orders": [
//     {
//       "_id": "ORD001",
//       "total": 2800,
//       "status": "Delivered"
//     },
//     {
//       "_id": "ORD002",
//       "total": 50000,
//       "status": "Pending"
//     },
//     {
//       "_id": "ORD003",
//       "total": 1200,
//       "status": "Shipped"
//     }
//   ]
// }