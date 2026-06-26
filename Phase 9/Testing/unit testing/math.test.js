const { add, multiply } = require('./math');

test('adds 2 + 3 to equal 5', () => {
  expect(add(2, 3)).toBe(5);
});

test('adds negative numbers: -1 + -1 = -2', () => {
  expect(add(-1, -1)).toBe(-2);
});

test('multiplies 3 * 4 to equal 12', () => {
  expect(multiply(3, 4)).toBe(12);
});

test('multiplies by zero to equal 0', () => {
  expect(multiply(5, 0)).toBe(0);
});