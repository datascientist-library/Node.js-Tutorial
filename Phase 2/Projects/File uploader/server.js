const express = require('express');
const multer = require('multer');

const app = express();

const upload = multer({
  dest: 'uploads/'
});


// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {

  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename
  });

});

// Server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});