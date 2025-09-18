// Type definitions and type guards
import { LegendaryResult } from './core';

export type { LegendaryResult };

export function isLegendaryResult(obj: any): obj is LegendaryResult {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.success === 'boolean' &&
    obj.success === true &&
    (obj.data === undefined || typeof obj.data === 'string') &&
    (obj.error === undefined || typeof obj.error === 'string')
  );
}