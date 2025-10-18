// Core functionality for the legendary repository
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
export function mainFunction(options) {
    if (!options || !options.exampleOption || options.exampleOption.trim() === '') {
        throw new Error('Invalid options provided. `exampleOption` must be a non-empty string.');
    }
    return {
        success: true,
        data: `Processed with option: ${options.exampleOption}`,
    };
}
