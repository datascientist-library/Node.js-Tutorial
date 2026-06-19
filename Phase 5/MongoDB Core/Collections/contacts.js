db.contacts.insertMany([
    {
        name: "Alice", message: "Nice website!", phone: "9876543210", createdAt:
            new Date()
    },
    {
        name: "Bob", message: "Do you have discounts on laptops?", phone: "9123456789",
        createdAt: new Date()
    },
    {
        name: "Carol", message: "I want to cancel my order.", phone: "9988776655",
        createdAt: new Date()
    }
])
