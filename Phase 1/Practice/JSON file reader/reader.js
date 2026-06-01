const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {

  if (err) {
    console.log('Error reading file:', err);
    return;
  }

  const jsonData = JSON.parse(data);

  console.log(jsonData);
  console.log("Name:", jsonData.name);
  console.log("Age:", jsonData.age);
  console.log("Skills:", jsonData.skills);

});