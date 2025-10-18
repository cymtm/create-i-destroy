// Type definitions and type guards
import { LegendaryResult } from './core';

export type { LegendaryResult };

/**
 * Type guard to check if an object is a valid LegendaryResult
 * @param obj - The object to check
 * @returns True if the object matches the LegendaryResult interface
 */
export function isLegendaryResult(obj: unknown): obj is LegendaryResult {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as Record<string, unknown>).success === 'boolean' &&
    (obj as Record<string, unknown>).success === true &&
    ((obj as Record<string, unknown>).data === undefined || typeof (obj as Record<string, unknown>).data === 'string') &&
    ((obj as Record<string, unknown>).error === undefined || typeof (obj as Record<string, unknown>).error === 'string')
  );
}