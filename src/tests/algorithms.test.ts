import { test, expect } from 'vitest';
import { removeIdenticalLetters, maximumOddSum } from '../algorithms';

test('removeIdenticalLetters removes consecutive identical letters', () => {
  const input = 'ffdttttyy';
  const expected = 'ffdtttyy';
  const result = removeIdenticalLetters(input);
  expect(result).toEqual(expected);
});

test('maximumOddSum find the highest possible sum of two numbers that, when added together, form an odd number', () => {
  const input = [61, 32, 51];
  const expected = 93;
  const result = maximumOddSum(input);
  expect(result).toEqual(expected);
});
