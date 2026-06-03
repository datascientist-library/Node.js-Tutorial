const fs = require('fs');

fs.readFile('sample.csv', 'utf8', (err, data) => {

    if (err) {
        console.log(err);
        return;
    }

    const lines = data.split('\n');

    const headers = lines[0].split(',');

    const result = [];

    for (let i = 1; i < lines.length; i++) {

        const values = lines[i].split(',');

        if (values.length !== headers.length) {
            continue;
        }

        const obj = {};

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = values[j];
        }

        result.push(obj);
    }

    console.log(result);

});