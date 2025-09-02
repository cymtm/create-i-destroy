// Utility functions for Create.I.Destroy

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}