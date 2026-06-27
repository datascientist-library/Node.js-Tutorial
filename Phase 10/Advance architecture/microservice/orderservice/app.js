const express = require('express');
const http    = require('http');
const app     = express();
app.use(express.json());

// Fake order database
const orders = [
  { id: 101, userId: 1, item: 'Laptop',  price: '$999' },
  { id: 102, userId: 1, item: 'Mouse',   price: '$29'  },
  { id: 103, userId: 2, item: 'Monitor', price: '$399' }
];

// Helper call user-service
function getUser(userId) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3001/users/${userId}`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 404) reject(new Error('User not found'));
        else resolve(JSON.parse(data));
      });
    }).on('error', reject);
  });
}

// Get orders for a user (calls user-service first)
app.get('/orders/user/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    // verify user exists (calls user-service)
    const user = await getUser(userId);

    // get their orders
    const userOrders = orders.filter(o => o.userId === userId);

    // return combined response
    res.status(200).json({
      user,
      orders:      userOrders,
      totalOrders: userOrders.length
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'order-service' });
});

app.listen(3002, () => console.log('Order Service running on port 3002'));


// OUTPUT

// User Service directly:

// {
//   "id":    1,
//   "name":  "Alice",
//   "email": "alice@example.com"
// }


// Order Service (calls User Service internally):

// {
//   "user": {
//     "id":    1,
//     "name":  "Alice",
//     "email": "alice@example.com"
//   },
//   "orders": [
//     { "id": 101, "userId": 1, "item": "Laptop", "price": "$999" },
//     { "id": 102, "userId": 1, "item": "Mouse",  "price": "$29"  }
//   ],
//   "totalOrders": 2
// }

// User not found:

// { "error": "User not found" }