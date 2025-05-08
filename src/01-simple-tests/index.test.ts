// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const a = 23;
  const b = 16;

  test('should add two numbers', () => {
    const action = Action.Add;
    expect(simpleCalculator({ a, b, action })).toBe(a + b);
  });

  test('should subtract two numbers', () => {
    const action = Action.Subtract;
    expect(simpleCalculator({ a, b, action })).toBe(a - b);
  });

  test('should multiply two numbers', () => {
    const action = Action.Multiply;
    expect(simpleCalculator({ a, b, action })).toBe(a * b);
  });

  test('should divide two numbers', () => {
    const action = Action.Divide;
    expect(simpleCalculator({ a, b, action })).toBe(a / b);
  });

  test('should exponentiate two numbers', () => {
    const action = Action.Exponentiate;
    expect(simpleCalculator({ a, b, action })).toBe(a ** b);
  });

  test('should return null for invalid action', () => {
    const action = 'Invalid action' as Action;
    expect(simpleCalculator({ a, b, action })).toBeNull;
  });

  test('should return null for invalid arguments', () => {
    const action = Action.Subtract;
    expect(simpleCalculator({ a: 'string', b, action })).toBeNull;
    expect(simpleCalculator({ a: false, b, action })).toBeNull;
    expect(simpleCalculator({ a: { c: 'string' }, b, action })).toBeNull;
  });
});
