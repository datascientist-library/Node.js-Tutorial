const express = require('express');

const app = express();

app.use(express.json());

const urlDatabase = {};

app.post('/shorten', (req, res) => {

    const longUrl = req.body.url;

    const shortCode = Math.random()
        .toString(36)
        .substring(2, 8);

    urlDatabase[shortCode] = longUrl;

    res.json({
        shortUrl: `http://localhost:3000/${shortCode}`
    });

});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});