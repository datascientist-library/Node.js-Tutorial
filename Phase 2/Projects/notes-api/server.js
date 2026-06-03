const express = require('express');

const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    text: "Learn JavaScript"
  }
];

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {

  const newNote = {
    id: notes.length + 1,
    text: req.body.text
  };

  notes.push(newNote);

  res.status(201).json(newNote);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});