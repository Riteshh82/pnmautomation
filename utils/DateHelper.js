/**
 * DateHelper — lightweight date utilities for test data generation.
 * All functions return ISO-format date strings (YYYY-MM-DD).
 */

/**
 * Returns today's date in YYYY-MM-DD format.
 */
function today() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Returns a date `daysFromNow` days in the future.
 * @param {number} daysFromNow Defaults to 30.
 */
function futureDate(daysFromNow = 30) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
}

/**
 * Returns a date `daysAgo` days in the past.
 * @param {number} daysAgo Defaults to 30.
 */
function pastDate(daysAgo = 30) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

/**
 * Returns a date offset by `months` calendar months from today.
 * Negative values go into the past.
 * @param {number} months
 */
function monthOffset(months) {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split('T')[0];
}

/**
 * Formats a Date object to YYYY-MM-DD.
 * @param {Date} date
 */
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

module.exports = { today, futureDate, pastDate, monthOffset, formatDate };
