console.log("Types of variables")

// 1. var functions. They can be updated and redeclared within its scope.
var a = 11
var a = "Helix"

var b = "Cubicle"
var b = 32

console.log(a)
console.log(b)

// 2. let functions. They can be updated but cannot be redeclared.
let c = 44

console.log(c)

c = "Cuboid"

console.log(c)

// 3. const functions. They cannot be updated or redeclared.
const author = "Motorsport"

console.log(author)
