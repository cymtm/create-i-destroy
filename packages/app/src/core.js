export function mainFunction(options) {
    if (!options || !options.exampleOption || options.exampleOption.trim() === '') {
        throw new Error('Invalid options provided. `exampleOption` must be a non-empty string.');
    }
    return {
        success: true,
        data: `Processed with option: ${options.exampleOption}`,
    };
}
