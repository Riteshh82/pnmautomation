const { test, expect } = require('@playwright/test');
const { ApiClient } = require('../../utils/ApiClient');

/**
 * API Verification — Negative Scenarios
 *
 * Tags:
 *   @negative — negative flow filter
 *   @api      — API module scope
 */

test.describe('@api @negative API Verification — Negative Scenarios', () => {

  test('TC-API-NEG-01: Login with invalid credentials returns non-success or token missing', async ({ request }) => {
    const res = await request.post(process.env.SSO_LOGIN_URL, {
      headers: { 'content-type': 'application/json' },
      data: {
        username: 'invalid_user_xyz',
        password: 'invalid_password_123',
        companyToken: process.env.SSO_COMPANY_TOKEN,
      },
    });

    // Should either return non-200 HTTP status or error body
    if (res.status() === 200) {
      const body = await res.json();
      expect(body?.token ?? body?.data?.token ?? null).toBeNull();
    } else {
      expect(res.status()).toBeGreaterThanOrEqual(400);
    }
  });

  test('TC-API-NEG-02: Calling protected endpoint without Bearer token fails', async ({ request }) => {
    const apiBase = process.env.API_BASE_URL;
    const res = await request.post(`${apiBase}/pnm_report/report/v1/equipment-document-report`, {
      headers: { 'content-type': 'application/json' },
      data: { siteId: '102', isPlant: false },
    });

    // Expect HTTP 401 / 403 or API error response
    expect([401, 403, 500, 200].includes(res.status())).toBe(true);
    if (res.status() === 200) {
      const body = await res.json();
      expect(body?.status === 200 && body?.success !== false).toBe(false);
    }
  });

});
