// Document in collection

// {
//   "_id": "ORD001",
//   "user": {
//     "userId": 101,
//     "name": "John Doe",
//     "email": "john@example.com"
//   },
//   "products": [
//     {
//       "productId": 1,
//       "name": "Wireless Mouse",
//       "price": 800,
//       "quantity": 1
//     },
//     {
//       "productId": 2,
//       "name": "Keyboard",
//       "price": 2000,
//       "quantity": 1
//     }
//   ],
//   "total": 2800,
//   "status": "Delivered",
//   "createdAt": "2026-06-13"
// }


// {
//   "_id": "ORD002",
//   "user": {
//     "userId": 102,
//     "name": "Jane Smith",
//     "email": "jane@example.com"
//   },
//   "products": [
//     {
//       "productId": 3,
//       "name": "Gaming Laptop",
//       "price": 50000,
//       "quantity": 1
//     }
//   ],
//   "total": 50000,
//   "status": "Pending",
//   "createdAt": "2026-06-14"
// }


// {
//   "_id": "ORD003",
//   "user": {
//     "userId": 103,
//     "name": "Amit Sharma",
//     "email": "amit@example.com"
//   },
//   "products": [
//     {
//       "productId": 4,
//       "name": "Monitor",
//       "price": 10000,
//       "quantity": 1
//     },
//     {
//       "productId": 1,
//       "name": "Wireless Mouse",
//       "price": 800,
//       "quantity": 2
//     }
//   ],
//   "total": 11600,
//   "status": "Shipped",
//   "createdAt": "2026-06-15"
// }


// Query
db.orders.findOne({ _id: "ORD001" })


// Output
// {
//   "_id": "ORD001",
//   "user": {
//     "userId": 101,
//     "name": "John Doe",
//     "email": "john@example.com"
//   },
//   "products": [
//     {
//       "productId": 1,
//       "name": "Wireless Mouse",
//       "price": 800,
//       "quantity": 1
//     },
//     {
//       "productId": 2,
//       "name": "Keyboard",
//       "price": 2000,
//       "quantity": 1
//     }
//   ],
//   "total": 2800,
//   "status": "Delivered",
//   "createdAt": "2026-06-13"
// }
