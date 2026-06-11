// npm init -y
// npm install express

const express = require('express');
const app = express();

app.get('/user/:id', (req, res, next) => {
    const user = null;

    if (!user) {
        return next(new Error('User not found'));
    }

    res.send(user);
});

app.use((err, req, res, next) => {
    res.status(404).json({
        error: err.message
    });
});

app.listen(3000);