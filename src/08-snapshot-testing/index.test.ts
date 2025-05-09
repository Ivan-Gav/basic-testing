// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const values = [
  { name: 'John', age: 22 },
  { name: 'Sara', age: 19 },
  { name: 'Leonardo', age: 56 },
  { name: 'Alice', age: 35 },
  { name: 'Jane', age: 32 },
];

const listSample = {
  value: { name: 'John', age: 22 },
  next: {
    value: { name: 'Sara', age: 19 },
    next: {
      value: { name: 'Leonardo', age: 56 },
      next: {
        value: { name: 'Alice', age: 35 },
        next: {
          value: { name: 'Jane', age: 32 },
          next: { value: null, next: null },
        },
      },
    },
  },
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList(values);
    expect(list).toStrictEqual(listSample);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList(values);
    expect(list).toMatchSnapshot();
  });
});
