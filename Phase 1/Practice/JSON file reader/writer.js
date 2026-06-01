const fs = require('fs');

const user = {
  name: "Henry",
  age: 21,
  city: "Mumbai"
};

fs.writeFile(
  'output.json',
  JSON.stringify(user, null, 2),
  (err) => {

    if (err) {
      console.log(err);
      return;
    }

    console.log('File written successfully!');
  }
);