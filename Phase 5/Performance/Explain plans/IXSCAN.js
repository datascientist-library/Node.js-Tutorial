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

db.products.createIndex({ price: 1 })
db.products.find({ price: { $gt: 1000 } }).explain("executionStats")


// {
//   "queryPlanner": {
//     "winningPlan": {
//       "stage": "FETCH",
//       "inputStage": {
//         "stage": "IXSCAN",
//         "keyPattern": { "price": 1 },
//         "indexName": "price_1",
//         "isMultiKey": false,
//         "isUnique": false,
//         "isSparse": false,
//         "direction": "forward",
//         "indexBounds": {
//           "price": [ "(1000.0, inf.0]" ]
//         }
//       }
//     },
//     "rejectedPlans": []
//   }

//   "executionStats": {
//     "nReturned": 4,
//     "executionTimeMillis": 1,
//     "totalKeysExamined": 4,
//     "totalDocsExamined": 4,
//     "executionStages": {
//       "stage": "FETCH",
//       "nReturned": 4,
//       "docsExamined": 4,
//       "inputStage": {
//         "stage": "IXSCAN",
//         "nReturned": 4,
//         "keysExamined": 4
//       }
//     }
//   }
// }