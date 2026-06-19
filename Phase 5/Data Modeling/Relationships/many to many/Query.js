db.order_items.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "productDetails"
    }
  }
])


// OUTPUT
// [
//   {
//     "orderId": "ORD001",
//     "quantity": 1,
//     "productDetails": [
//       { "_id": 1, "name": "Mouse", "price": 800 }
//     ]
//   },
//   {
//     "orderId": "ORD001",
//     "quantity": 1,
//     "productDetails": [
//       { "_id": 2, "name": "Keyboard", "price": 2000 }
//     ]
//   },
//   {
//     "orderId": "ORD002",
//     "quantity": 1,
//     "productDetails": [
//       { "_id": 3, "name": "Laptop", "price": 50000 }
//     ]
//   }
// ]