// Error handling is the process of detecting and responding to failures that occur during asynchronous operations such as API calls, file operations, or database queries.

// Error hadnling with callbacks

function divide(a, b, callback) {
    if (b === 0) {
        return callback(new Error("Cannot divide by zero"));
    }

    callback(null, a / b);
}

divide(10, 0, (err, result) => {
    if (err) {
        console.error(err.message);
        return;
    }

    console.log(result);
});


// Error handling

function divide(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject(new Error("Cannot divide by zero"));
        } else {
            resolve(a / b);
        }
    });
}

divide(10, 0)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error.message);
    });