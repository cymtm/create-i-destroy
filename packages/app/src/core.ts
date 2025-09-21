// Core functionality for the legendary repository
export interface LegendaryResult {
  success: boolean;
  data?: string;
  error?: string;
}

export function mainFunction(options: { exampleOption: string } | null): LegendaryResult {
  if (!options || !options.exampleOption || options.exampleOption.trim() === '') {
    throw new Error('Invalid options provided. `exampleOption` must be a non-empty string.');
  }

  return {
    success: true,
    data: `Processed with option: ${options.exampleOption}`,
  };
}