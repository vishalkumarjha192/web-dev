// Common words that should not count as a match
const STOP_WORDS = ['the', 'and', 'for', 'with', 'lost', 'found', 'near', 'from', 'my', 'a', 'an', 'of', 'in', 'on', 'at'];

exports.getKeywords = (title) =>
  [...new Set(title.toLowerCase().split(/[^a-z0-9]+/))].filter((w) => w.length >= 3 && !STOP_WORDS.includes(w));

exports.escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
