// Contacts collection
// [
//   {
//     "_id": 1,
//     "name": "Alice",
//     "message": "Nice website!"
//   },
//   {
//     "_id": 2,
//     "name": "Bob",
//     "message": "Do you have discounts on laptops?"
//   },
//   {
//     "_id": 3,
//     "name": "Carol",
//     "message": "I want to cancel my order."
//   }
// ]


// Delete One
db.contacts.deleteOne({ name: "Alice" })


// Output

// [
//   {
//     "_id": 2,
//     "name": "Bob",
//     "message": "Do you have discounts on laptops?"
//   },
//   {
//     "_id": 3,
//     "name": "Carol",
//     "message": "I want to cancel my order."
//   }
// ]