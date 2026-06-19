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

db.products.createIndex({ category: 1, price: 1 })
db.products.find(
  { category: "Electronics" },
  { price: 1, _id: 0 } 
).explain("executionStats")


// Query

// {
//   "queryPlanner": {
//     "winningPlan": {
//       "stage": "PROJECTION_COVERED",
//       "transformBy": { "price": 1, "_id": 0 },
//       "inputStage": {
//         "stage": "IXSCAN",
//         "keyPattern": { "category": 1, "price": 1 },
//         "indexName": "category_1_price_1",
//         "indexBounds": {
//           "category": [ ["Electronics", "Electronics"] ],
//           "price": [ "[MinKey, MaxKey]" ]
//         }
//       }
//     }
//   }


// Execution stats

//  "executionStats": {
//     "nReturned": 3,
//     "executionTimeMillis": 0,
//     "totalKeysExamined": 3,
//     "totalDocsExamined": 0,
//     "executionStages": {
//       "stage": "PROJECTION_COVERED",
//       "nReturned": 3,
//       "inputStage": {
//         "stage": "IXSCAN",
//         "nReturned": 3,
//         "keysExamined": 3
//       }
//     }
//   }
// }