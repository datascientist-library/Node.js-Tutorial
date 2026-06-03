// Parallel execution means starting multiple independent asynchronous tasks at the same time instead of waiting for each one to finish before starting the next.
// This can significantly reduce total execution time when tasks don't depend on each other.

async function parallel() {
    const [user, orders, products] = await Promise.all([
        fetchUser(),
        fetchOrders(),
        fetchProducts()
    ]);

    console.log(user, orders, products);
}

// Example

function task(name, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`${name} completed`);
            resolve(name);
        }, delay);
    });
}

Promise.all([
    task("A", 2000),
    task("B", 1000),
    task("C", 3000)
]).then(results => {
    console.log(results);
});


// Example

Promise.allSettled([
    Promise.resolve("Success"),
    Promise.reject("Failed")
]).then(results => {
    console.log(results);
});