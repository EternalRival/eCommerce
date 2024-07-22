import { clampValue } from './clamp-value';

describe('clamp-value', () => {
  describe('positive values', () => {
    it.each([
      [2, 1, 4, 2],
      [2, 2, 4, 2],
      [2, 3, 4, 3],
      [2, 4, 4, 4],
      [2, 5, 4, 4],
    ])('clampValue(%d, %d, %d) === %d', (min, current, max, expected) => {
      expect(clampValue(min, current, max)).toBe(expected);
    });
  });

  describe('negative values', () => {
    it.each([
      [-4, -1, -2, -2],
      [-4, -2, -2, -2],
      [-4, -3, -2, -3],
      [-4, -4, -2, -4],
      [-4, -5, -2, -4],
    ])('clampValue(%d, %d, %d) === %d', (min, current, max, expected) => {
      expect(clampValue(min, current, max)).toBe(expected);
    });
  });

  describe('mixed values', () => {
    it.each([
      [-1, -2, 1, -1],
      [-1, -1, 1, -1],
      [-1, 0, 1, 0],
      [-1, 1, 1, 1],
      [-1, 2, 1, 1],
    ])('clampValue(%d, %d, %d) === %d', (min, current, max, expected) => {
      expect(clampValue(min, current, max)).toBe(expected);
    });
  });
});
