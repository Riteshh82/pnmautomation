/**
 * ApiHelper — intercepts and validates network traffic during UI actions.
 *
 * Usage:
 *   const api = new ApiHelper(page);
 *   const captured = await api.capture('/api/login', () => loginPage.login(...));
 *   api.assertStatus(captured, 200);
 */
class ApiHelper {
  constructor(page) {
    this.page = page;
  }

  /**
   * Intercepts the first response whose URL contains `urlFragment`
   * while `action` is executing. Returns the captured request/response pair.
   *
   * @param {string} urlFragment  Substring to match in the response URL.
   * @param {() => Promise<void>} action       The async UI action that triggers the request.
   * @param {number} timeoutMs    Maximum wait time in milliseconds (default 15 s).
   */
  async capture(urlFragment, action, timeoutMs = 15_000) {
    const responsePromise = this.page.waitForResponse(
      (response) => response.url().includes(urlFragment),
      { timeout: timeoutMs }
    );

    await action();

    const response = await responsePromise;
    const request = response.request();

    let requestBody = null;
    try {
      requestBody = request.postDataJSON();
    } catch {
      // Body is not JSON (e.g. form-encoded, binary, or absent)
    }

    let responseBody = null;
    try {
      responseBody = await response.json();
    } catch {
      // Response is not JSON
    }

    return {
      url: request.url(),
      method: request.method(),
      requestBody,
      status: response.status(),
      responseBody,
    };
  }

  /** Assert that the HTTP status code matches the expected value. */
  assertStatus(captured, expectedStatus) {
    if (captured.status !== expectedStatus) {
      throw new Error(
        `Expected HTTP ${expectedStatus} but got ${captured.status} for ${captured.url}`
      );
    }
  }

  /**
   * Assert that `responseBody.success` is truthy.
   * Adapt the check to match your API's success shape if needed.
   */
  assertSuccess(captured) {
    const body = captured.responseBody;
    if (!body || body['success'] === false) {
      throw new Error(
        `API returned non-success for ${captured.url}: ${JSON.stringify(body)}`
      );
    }
  }

  assertRequestContains(captured, fields) {
    const body = captured.requestBody;

    if (!body) {
      throw new Error(`Request body is empty for ${captured.url}`);
    }

    for (const [key, expected] of Object.entries(fields)) {
      const actual = body[key];
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(
          `Request body mismatch on "${key}": ` +
          `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
        );
      }
    }
  }

  assertResponseContains(captured, fields) {
    const body = captured.responseBody;

    if (!body) {
      throw new Error(`Response body is empty for ${captured.url}`);
    }

    for (const [key, expected] of Object.entries(fields)) {
      const actual = body[key];
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(
          `Response body mismatch on "${key}": ` +
          `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
        );
      }
    }
  }
}

module.exports = { ApiHelper };
