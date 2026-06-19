db.users.aggregate([
  {
    $lookup: {
      from: "profiles",
      localField: "_id",
      foreignField: "userId",
      as: "profile"
    }
  }
])

// Output
// {
//   "_id": 101,
//   "name": "John Doe",
//   "email": "john@example.com",
//   "profile": [
//     {
//       "_id": 201,
//       "age": 25,
//       "gender": "Male",
//       "phone": "9999999999",
//       "address": "Mumbai"
//     }
//   ]
// }