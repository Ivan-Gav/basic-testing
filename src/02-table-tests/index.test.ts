// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Divide, expected: 3 / 2 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 ** 2 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 2 ** 2 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 3 ** 2 },
  { a: 'string', b: 2, action: Action.Add, expected: null },
  { a: false, b: 2, action: Action.Add, expected: null },
  { a: { c: 45 }, b: 2, action: Action.Add, expected: null },
  { a: 1, b: 2, action: 'invalidAction' as Action, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `returns $expected for input $a $action $b`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
