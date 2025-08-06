import { describe, it, expect } from 'vitest';
import { mainFunction, isLegendaryResult } from '../src';

describe('mainFunction', () => {
  it('should process valid options and return a successful result', () => {
    const options = {
      exampleOption: 'test-value',
    };
    const result = mainFunction(options);
    const expected = {
      success: true,
      data: 'Processed with option: test-value',
    };
    expect(result).toEqual(expected);
  });

  it('should throw an error if options are null', () => {
    const invalidOptions = null;
    expect(() => mainFunction(invalidOptions)).toThrow('Invalid options provided. `exampleOption` must be a non-empty string.');
  });

  it('should throw an error if exampleOption is an empty string', () => {
    const options = {
      exampleOption: '',
    };
    expect(() => mainFunction(options)).toThrow('Invalid options provided. `exampleOption` must be a non-empty string.');
  });

  it('should satisfy the isLegendaryResult type guard for a successful result', () => {
    const options = {
      exampleOption: 'type-guard-test',
    };
    const result = mainFunction(options);
    expect(isLegendaryResult(result)).toBe(true);
    expect(isLegendaryResult({ success: false, error: 'test' })).toBe(false);
  });
});