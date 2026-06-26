const { add, subtract, multiply, divide } = require('./calculator');

test('adds 2 + 3 = 5',        () => expect(add(2, 3)).toBe(5));
test('subtracts 10 - 4 = 6',  () => expect(subtract(10, 4)).toBe(6));
test('multiplies 3 * 4 = 12', () => expect(multiply(3, 4)).toBe(12));
test('divides 10 / 2 = 5',    () => expect(divide(10, 2)).toBe(5));
test('throws on divide by zero', () => {
  expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
});


// OUTPUT

// PASS  calculator.test.js
//   ✓ adds 2 + 3 = 5 (3ms)
//   ✓ subtracts 10 - 4 = 6  (1ms)
//   ✓ multiplies 3 * 4 = 12 (1ms)
//   ✓ divides 10 / 2 = 5 (1ms)
//   ✓ throws on divide by zero (2ms)

// Tests: 5 passed, 5 total
// Time:  0.701s