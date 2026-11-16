const { ApiHelper } = require('./ApiHelper');
const { today, futureDate, pastDate, monthOffset, formatDate } = require('./DateHelper');

/**
 * Escapes regex special characters in a string so it can be safely used in a RegExp.
 * @param {string} value
 * @returns {string}
 */
function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { ApiHelper, today, futureDate, pastDate, monthOffset, formatDate, escapeRegex };

