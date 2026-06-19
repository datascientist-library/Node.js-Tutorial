// Orders collection

// [
//   {
//     "_id": 1,
//     "orderId": "ORD001",
//     "status": "Delivered"
//   },
//   {
//     "_id": 2,
//     "orderId": "ORD002",
//     "status": "Pending"
//   },
//   {
//     "_id": 3,
//     "orderId": "ORD003",
//     "status": "Delivered"
//   }
// ]


// Delete Many
db.orders.deleteMany({ status: "Delivered" })

// Output
// [
//   {
//     "_id": 2,
//     "orderId": "ORD002",
//     "status": "Pending"
//   }
// ]