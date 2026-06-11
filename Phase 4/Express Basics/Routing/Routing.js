// npm init -y
// npm install express
// Example 1
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/contact', (req, res) => {
    res.send('Contact Page');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Visit
// 1. localhost:3000/ [To visit home page]
// 2. localhost:3000/about [to visit about page]
// 3. localhost:3000/contact [to visit contact page]