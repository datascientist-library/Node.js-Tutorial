// A Stack is a linear data structure that follows the LIFO (Last In, First Out) principle.
// The last element added to the stack is the first one removed.

class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

const stack = new Stack();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.pop()); 
console.log(stack.peek()); 

// Function call

function first() {
    second();
}

function second() {
    third();
}

function third() {
    console.log("Hello");
}

first();