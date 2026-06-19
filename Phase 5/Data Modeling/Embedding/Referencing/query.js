db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails"
    }
  },
  {
    $lookup: {
      from: "products",
      localField: "productIds",
      foreignField: "_id",
      as: "productDetails"
    }
  }
])


// FINAL OUTPUT

// [
//   {
//     "_id": "ORD001",
//     "userId": 101,
//     "userDetails": [
//       {
//         "_id": 101,
//         "name": "John Doe",
//         "email": "john@example.com"
//       }
//     ],
//     "productDetails": [
//       {
//         "_id": 1,
//         "name": "Wireless Mouse",
//         "price": 800
//       },
//       {
//         "_id": 2,
//         "name": "Keyboard",
//         "price": 2000
//       }
//     ],
//     "total": 2800,
//     "status": "Delivered",
//     "createdAt": "2026-06-13"
//   },
//   {
//     "_id": "ORD002",
//     "userId": 102,
//     "userDetails": [
//       {
//         "_id": 102,
//         "name": "Jane Smith",
//         "email": "jane@example.com"
//       }
//     ],
//     "productDetails": [
//       {
//         "_id": 3,
//         "name": "Gaming Laptop",
//         "price": 50000
//       }
//     ],
//     "total": 50000,
//     "status": "Pending",
//     "createdAt": "2026-06-14"
//   },
//   {
//     "_id": "ORD003",
//     "userId": 103,
//     "userDetails": [
//       {
//         "_id": 103,
//         "name": "Amit Sharma",
//         "email": "amit@example.com"
//       }
//     ],
//     "productDetails": [
//       {
//         "_id": 4,
//         "name": "Monitor",
//         "price": 10000
//       },
//       {
//         "_id": 1,
//         "name": "Wireless Mouse",
//         "price": 800
//       }
//     ],
//     "total": 11600,
//     "status": "Shipped",
//     "createdAt": "2026-06-15"
//   }
// ]