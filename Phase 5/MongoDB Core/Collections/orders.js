db.orders.insertMany([
    {
        orderId: "ORD001",
        user: "John Doe",
        products: [
            { name: "Wireless Mouse", quantity: 1, price: 799 },
            { name: "Mechanical Keyboard", quantity: 1, price: 2499 }
        ],
        total: 3298,
        status: "Delivered",
        createdAt: new Date()
    },

    {
        orderId: "ORD002",
        user: "Jane Smith",
        products: [
            { name: "Gaming Laptop", quantity: 1, price: 85999 }
        ],
        total: 85999,
        status: "Pending",
        createdAt: new Date()
    }
])