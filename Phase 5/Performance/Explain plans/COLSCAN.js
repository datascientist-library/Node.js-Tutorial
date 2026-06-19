// Collection

// Doc 1,2
// {
// _id: "6650a1",
// name: "Wireless Mouse",
// price: 799,
// category: "Electronics",
// stock: 120,
// ratings: 4.5,
// tags: 
// computer
// accessory
// wireless
// ,
// createdAt: "2026-06-14T11:40:09.945Z"
// }
// {
// _id: "6650a2",
// name: "Mechanical Keyboard",
// price: 2499,
// category: "Electronics",
// stock: 80,
// ratings: 4.8,
// tags: 
// keyboard
// mechanical
// ,
// createdAt: "2026-06-14T11:40:09.945Z"
// }

// Doc 3,4,5
// {
// _id: "6650a3",
// name: "Gaming Laptop",
// price: 85999,
// category: "Computers",
// stock: 30,
// ratings: 4.6,
// tags: 
// gaming
// laptop
// }
// {
// _id: "6650a4",
// name: "USB-C Hub",
// price: 1299,
// category: "Electronics",
// stock: 200,
// ratings: 4.2,
// tags: 
// usb
// accessory
// }
// {
// _id: "6650a5",
// name: "Gaming Chair",
// price: 12999,
// category: "Furniture",
// stock: 15,
// ratings: 4.7,
// tags: 
// gaming
// chair
// ergonomic
// }

db.products.find({ price: { $gt: 1000 } }).explain("executionStats")

// {
//   "queryPlanner": {
//     "plannerVersion": 1,
//     "namespace": "testdb.products",
//     "indexFilterSet": false,
//     "parsedQuery": { "price": { "$gt": 1000 } },
//     "winningPlan": {
//       "stage": "COLLSCAN",
//       "filter": { "price": { "$gt": 1000 } },
//       "direction": "forward"
//     },
//     "rejectedPlans": []
//   }

// Execution stats
//   "executionStats": {
//     "executionSuccess": true,
//     "nReturned": 4,
//     "executionTimeMillis": 18,
//     "totalKeysExamined": 0,
//     "totalDocsExamined": 5,
//     "executionStages": {
//       "stage": "COLLSCAN",
//       "nReturned": 4,
//       "executionTimeMillisEstimate": 0,
//       "works": 7,
//       "advanced": 4,
//       "needTime": 2,
//       "needYield": 0,
//       "docsExamined": 5
//     }
//   }
// }