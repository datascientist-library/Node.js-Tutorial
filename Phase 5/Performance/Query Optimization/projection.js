// Collection

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
// ,
// createdAt: "2026-06-14T11:40:09.945Z"
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
// ,
// createdAt: "2026-06-14T11:40:09.945Z"
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
// ,
// createdAt: "2026-06-14T11:40:09.945Z"
// }



db.products.find(
  { category: "Electronics" },
  { name: 1, price: 1, _id: 0 }
)


// OUTPUT

// {
// name: "Wireless Mouse",
// price: 799
// }
// {
// name: "Mechanical Keyboard",
// price: 2499
// }
// {
// name: "USB-C Hub",
// price: 1299
// }