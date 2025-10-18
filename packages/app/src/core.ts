// Core functionality for the legendary repository

/**
 * Result object returned by core functions
 * @interface LegendaryResult
 * @property {boolean} success - Indicates if the operation was successful
 * @property {string} [data] - Optional data returned on success
 * @property {string} [error] - Optional error message on failure
 */
export interface LegendaryResult {
  success: boolean;
  data?: string;
  error?: string;
}

/**
 * Main processing function for the legendary repository
 * @param {Object | null} options - Configuration options
 * @param {string} options.exampleOption - Required option that must be a non-empty string
 * @returns {LegendaryResult} Result object with success status and processed data
 * @throws {Error} When options are null or exampleOption is empty/whitespace
 * @example
 * const result = mainFunction({ exampleOption: 'test-value' });
 * // Returns: { success: true, data: 'Processed with option: test-value' }
 */
export function mainFunction(options: { exampleOption: string } | null): LegendaryResult {
  if (!options || !options.exampleOption || options.exampleOption.trim() === '') {
    throw new Error('Invalid options provided. `exampleOption` must be a non-empty string.');
  }

  return {
    success: true,
    data: `Processed with option: ${options.exampleOption}`,
  };
}