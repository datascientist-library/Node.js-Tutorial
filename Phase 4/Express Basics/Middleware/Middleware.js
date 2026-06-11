// npm init -y
// npm install express

const express = require('express');
const app = express();

function checkAuth(req, res, next) {
    const isLoggedIn = true;

    if (!isLoggedIn) {
        return res.send('Access Denied');
    }

    next();
}

app.get('/dashboard', checkAuth, (req, res) => {
    res.send('Welcome to Dashboard');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Visit 
// http://localhost:3000/dashboard