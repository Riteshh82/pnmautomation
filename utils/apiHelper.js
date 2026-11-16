const { expect, test } = require('@playwright/test');
const { ApiClient } = require('./ApiClient');

/**
 * Redact sensitive info (tokens, passwords, cookies) from strings/objects
 */
function redactSensitiveData(data) {
  if (!data) return data;
  let str = typeof data === 'string' ? data : JSON.stringify(data);
  str = str.replace(/Bearer\s+[A-Za-z0-9-_=.]+/gi, 'Bearer [REDACTED]');
  str = str.replace(/"(token|accessToken|password|secret|companyToken)":\s*"[^"]+"/gi, '"$1": "[REDACTED]"');
  try {
    return typeof data === 'object' ? JSON.parse(str) : str;
  } catch (e) {
    return str;
  }
}

/**
 * Standard API response validation and reporting helper
 */
async function validateApiResponse(res, {
  service = '',
  endpoint = '',
  method = 'GET',
  expectedStatus = 200,
  validateBody = true,
  checkFields = [],
} = {}) {
  const status = res.status();
  const contentType = res.headers()['content-type'] || '';
  let body = null;
  let text = '';

  if (contentType.includes('application/json')) {
    try {
      body = await res.json();
    } catch (e) {
      text = await res.text().catch(() => '');
    }
  } else {
    text = await res.text().catch(() => '');
  }

  // Annotate test with redacted details for Playwright report
  test.info().annotations.push({
    type: 'api-response',
    description: `[${method}] ${endpoint} | Status: ${status} | Service: ${service}`,
  });

  // Assertion: Status code
  expect(
    status,
    `[${service}] ${method} ${endpoint} failed. Expected HTTP ${expectedStatus}, but got ${status}. Response: ${text || JSON.stringify(body)}`
  ).toBe(expectedStatus);

  // Assertion: Response body structure
  if (validateBody && body && typeof body === 'object') {
    if (body.status !== undefined && typeof body.status === 'number') {
      expect(
        body.status,
        `[${service}] ${method} ${endpoint} body.status mismatch. Expected ${expectedStatus}, got ${body.status}`
      ).toBe(expectedStatus);
    }

    // Check required fields if specified
    for (const field of checkFields) {
      expect(
        body[field],
        `[${service}] ${method} ${endpoint} missing expected field: '${field}'`
      ).toBeDefined();
    }
  }

  return { status, body, text };
}

module.exports = {
  ApiClient,
  validateApiResponse,
  redactSensitiveData,
};
