// Collection
// {
//   _id: ObjectId('6a2e931955e85c53ef47e282'),
//   name: 'Wireless Mouse',
//   price: 799,
//   category: 'Electronics',
//   stock: 120,
//   ratings: 4.5,
//   tags: [
//     'computer',
//     'accessory',
//     'wireless'
//   ],
//   createdAt: 2026-06-14T11:40:09.945Z
// }
// {
//   _id: ObjectId('6a2e931955e85c53ef47e283'),
//   name: 'Mechanical Keyboard',
//   price: 2499,
//   category: 'Electronics',
//   stock: 80,
//   ratings: 4.8,
//   tags: [
//     'keyboard',
//     'mechanical'
//   ],
//   createdAt: 2026-06-14T11:40:09.945Z
// }
// {
//   _id: ObjectId('6a2e931955e85c53ef47e284'),
//   name: 'Gaming Laptop',
//   price: 85999,
//   category: 'Computers',
//   stock: 30,
//   ratings: 4.6,
//   tags: [
//     'gaming',
//     'laptop'
//   ],
//   createdAt: 2026-06-14T11:40:09.945Z
// }


// Create an Index

db.products.createIndex({ name: 1 })

// OUTPUT
// name_1

// View All Indexes

db.products.getIndexes()

// OUTPUT

// [
//   { v: 2, key: { _id: 1 }, name: '_id_' },
//   { v: 2, key: { name: 1 }, name: 'name_1' }
// ]