/**
 * Type guard to check if an object is a valid LegendaryResult
 * @param obj - The object to check
 * @returns True if the object matches the LegendaryResult interface
 */
export function isLegendaryResult(obj) {
    return (typeof obj === 'object' &&
        obj !== null &&
        typeof obj.success === 'boolean' &&
        obj.success === true &&
        (obj.data === undefined || typeof obj.data === 'string') &&
        (obj.error === undefined || typeof obj.error === 'string'));
}
