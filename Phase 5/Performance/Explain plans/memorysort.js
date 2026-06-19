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

db.products.find({ category: "Electronics" })
  .sort({ price: -1 })
  .explain("executionStats")

// Query

// {
//   "queryPlanner": {
//     "winningPlan": {
//       "stage": "SORT",
//       "sortPattern": { "price": -1 },
//       "memLimit": 104857600,
//       "type": "simple",
//       "inputStage": {
//         "stage": "FETCH",
//         "inputStage": {
//           "stage": "IXSCAN",
//           "indexName": "category_1",
//           "direction": "forward"
//         }
//       }
//     }
//   }


// Execution stats

//   "executionStats": {
//     "nReturned": 3,
//     "executionTimeMillis": 6,
//     "totalKeysExamined": 3,
//     "totalDocsExamined": 3,
//     "executionStages": {
//       "stage": "SORT",
//       "nReturned": 3,
//       "memUsage": 264,
//       "memLimit": 104857600,
//       "sortPattern": { "price": -1 },
//       "inputStage": {
//         "stage": "SORT_KEY_GENERATOR",
//         "nReturned": 3
//       }
//     }
//   }
// }