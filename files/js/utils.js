// Utility functions for Create.I.Destroy

/**
 * Generates a random integer between min and max (inclusive)
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {number} Random integer in the range [min, max]
 * @example
 * randomBetween(1, 10); // Returns a number between 1 and 10
 */
export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} New shuffled array (does not modify original)
 * @example
 * shuffle([1, 2, 3, 4]); // Returns shuffled copy like [3, 1, 4, 2]
 */
export function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Clamps a value between a minimum and maximum
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {number} Clamped value
 * @example
 * clamp(150, 0, 100); // Returns 100
 * clamp(-10, 0, 100); // Returns 0
 * clamp(50, 0, 100); // Returns 50
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Formats a number with K/M suffixes for readability
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 * @example
 * formatNumber(1500); // Returns "1.5K"
 * formatNumber(2500000); // Returns "2.5M"
 * formatNumber(999); // Returns "999"
 */
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Creates a promise that resolves after a specified delay
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>} Promise that resolves after the delay
 * @example
 * await wait(1000); // Waits for 1 second
 */
export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}