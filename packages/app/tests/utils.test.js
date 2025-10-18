import { describe, it, expect } from 'vitest';

// Mock utility functions for testing (since they're in the game files)
// In a real scenario, these would be imported from a shared module

/**
 * Test utilities - these mirror the actual game utilities
 */
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('randomBetween', () => {
  it('should return a number within the specified range', () => {
    const min = 1;
    const max = 10;
    const result = randomBetween(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it('should return the same number when min equals max', () => {
    const value = 5;
    const result = randomBetween(value, value);
    expect(result).toBe(value);
  });

  it('should return integers only', () => {
    const result = randomBetween(1, 100);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('should handle negative ranges', () => {
    const min = -10;
    const max = -1;
    const result = randomBetween(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});

describe('shuffle', () => {
  it('should return an array of the same length', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffle(original);
    expect(shuffled.length).toBe(original.length);
  });

  it('should not modify the original array', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    shuffle(original);
    expect(original).toEqual(copy);
  });

  it('should contain all original elements', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffle(original);
    original.forEach(item => {
      expect(shuffled).toContain(item);
    });
  });

  it('should handle empty arrays', () => {
    const result = shuffle([]);
    expect(result).toEqual([]);
  });

  it('should handle single-element arrays', () => {
    const original = [42];
    const result = shuffle(original);
    expect(result).toEqual([42]);
  });
});

describe('clamp', () => {
  it('should return the value when within range', () => {
    expect(clamp(50, 0, 100)).toBe(50);
    expect(clamp(25, 0, 100)).toBe(25);
    expect(clamp(75, 0, 100)).toBe(75);
  });

  it('should return min when value is below minimum', () => {
    expect(clamp(-10, 0, 100)).toBe(0);
    expect(clamp(-100, 0, 100)).toBe(0);
  });

  it('should return max when value is above maximum', () => {
    expect(clamp(150, 0, 100)).toBe(100);
    expect(clamp(200, 0, 100)).toBe(100);
  });

  it('should handle negative ranges', () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-15, -10, -1)).toBe(-10);
    expect(clamp(0, -10, -1)).toBe(-1);
  });

  it('should handle floating point numbers', () => {
    expect(clamp(5.5, 0, 10)).toBe(5.5);
    expect(clamp(15.5, 0, 10)).toBe(10);
  });
});

describe('formatNumber', () => {
  it('should return number as string for values less than 1000', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(999)).toBe('999');
    expect(formatNumber(500)).toBe('500');
  });

  it('should format thousands with K suffix', () => {
    expect(formatNumber(1000)).toBe('1.0K');
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(999999)).toBe('1000.0K');
  });

  it('should format millions with M suffix', () => {
    expect(formatNumber(1000000)).toBe('1.0M');
    expect(formatNumber(2500000)).toBe('2.5M');
    expect(formatNumber(10000000)).toBe('10.0M');
  });

  it('should handle edge cases', () => {
    expect(formatNumber(1001)).toBe('1.0K');
    expect(formatNumber(1000001)).toBe('1.0M');
  });
});

describe('wait', () => {
  it('should resolve after the specified time', async () => {
    const start = Date.now();
    await wait(100);
    const elapsed = Date.now() - start;
    // Allow some tolerance for timing
    expect(elapsed).toBeGreaterThanOrEqual(90);
    expect(elapsed).toBeLessThan(200);
  });

  it('should return a promise', () => {
    const result = wait(10);
    expect(result).toBeInstanceOf(Promise);
  });

  it('should handle zero delay', async () => {
    const start = Date.now();
    await wait(0);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(50);
  });
});
