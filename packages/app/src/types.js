export function isLegendaryResult(obj) {
    return (typeof obj === 'object' &&
        obj !== null &&
        typeof obj.success === 'boolean' &&
        obj.success === true &&
        (obj.data === undefined || typeof obj.data === 'string') &&
        (obj.error === undefined || typeof obj.error === 'string'));
}
