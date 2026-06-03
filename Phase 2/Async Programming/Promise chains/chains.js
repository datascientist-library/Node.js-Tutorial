// A promise chain is a sequence of .then(), .catch(), and optionally .finally() calls on a Promise, where the result of one step is passed to the next step.

// Example

function getNumber() {
    return Promise.resolve(5);
}

getNumber()
    .then(num => {
        console.log(num);
        return num * 2;
    })
    .then(result => {
        console.log(result); 
        return result + 3;
    })
    .then(finalResult => {
        console.log(finalResult); 
    })
    .catch(error => {
        console.error(error);
    });



// Async Operation

function fetchUser() {
    return Promise.resolve({ id: 1, name: "Alice" });
}

function fetchOrders(userId) {
    return Promise.resolve(["Order1", "Order2"]);
}

fetchUser()
    .then(user => {
        console.log(user.name);
        return fetchOrders(user.id);
    })
    .then(orders => {
        console.log(orders);
    })
    .catch(err => {
        console.error(err);
    });