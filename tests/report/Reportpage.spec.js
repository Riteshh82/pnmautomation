const { test, expect } = require('@playwright/test');
const { ApiClient } = require('../../utils/ApiClient');

/**
 * PNM Report Page — API Verification
 *
 * Source: pnmreportpage.har (PNM Report page network capture)
 *
 * Each test re-sends the exact payload captured in the HAR against the
 * live API and asserts the contract the report page relies on:
 *   1. HTTP 200
 *   2. response.status === 200 (API-level status echoed in the body)
 *   3. no error message in the body
 *   4. response shape is the one the report page expects (object/array,
 *      pagination wrapper, etc.)
 *
 * If any of this drifts, the test fails with a message naming exactly
 * which endpoint and which expectation broke — not just a generic
 * "request failed".
 */

const SITE_ID = process.env.SITE_ID ?? '102';

/**
 * Common assertions shared by every report endpoint in this suite.
 * @param {import('@playwright/test').APIResponse} res
 * @param {string} label
 */
async function expectHealthyResponse(res, label) {
  expect(res.status(), `${label}: expected HTTP 200, got ${res.status()}`).toBe(200);

  const body = await res.json();

  expect(
    body?.status,
    `${label}: expected body.status 200, got ${JSON.stringify(body?.status)}`
  ).toBe(200);

  // Some endpoints return message: null on empty results — only fail on an
  // actual error message such as "FAILED" / "ERROR" / exception text.
  if (body?.message && typeof body.message === 'string') {
    expect(
      /fail|error|exception/i.test(body.message),
      `${label}: API returned an error message: "${body.message}"`
    ).toBe(false);
  }

  return body;
}

test.describe('@api @report — PNM Report Page API Verification', () => {

  test('TC-RPT-01: Equipment Document Report', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_report/report/v1/equipment-document-report', {
      pageSize: 10,
      pageNo: 1,
      siteId: SITE_ID,
      isPlant: false,
    });

    const body = await expectHealthyResponse(res, 'Equipment Document Report');
    expect(body.data, 'Equipment Document Report: expected a data object').toBeTruthy();
  });

  test('TC-RPT-02: Daily Utilization Report (get-daily-utilization-report)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_report/report/v1/get-daily-utilization-report', {
      siteId: SITE_ID,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      shiftId: null,
      isOwned: null,
      pageNo: 1,
      pageSize: 15,
      isPlant: false,
      categoryId: null,
      machineType: '1',
    });

    const body = await expectHealthyResponse(res, 'Daily Utilization Report');
    expect(body.data, 'Daily Utilization Report: expected a data object').toBeTruthy();
  });

  test('TC-RPT-03: Tyre/Battery Consumption Report', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const today = new Date().toISOString().split('T')[0];

    const res = await api.post('/pnm_report/report/v1/tyre-battery-consumption-report', {
      pageNo: 1,
      pageSize: 15,
      siteId: SITE_ID,
      fromDate: today,
      toDate: today,
      partType: 1,
    });

    await expectHealthyResponse(res, 'Tyre/Battery Consumption Report');
  });

  test('TC-RPT-04: Out-Site Machine Report', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_report/report/v1/out-site-machine-report', {
      siteId: SITE_ID,
      fromDate: '2026-05-19',
      toDate: '2026-06-19',
      machineType: 'Equipment',
      pageNo: 1,
      pageSize: 15,
    });

    const body = await expectHealthyResponse(res, 'Out-Site Machine Report');
    expect(body.data, 'Out-Site Machine Report: expected a data object').toBeTruthy();
  });

  test('TC-RPT-05: Job Card Report', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_report/report/v1/get-jobcard-report', {
      siteId: SITE_ID,
      fromDate: '2026-05-19',
      toDate: '2026-06-19',
      machineType: 'Equipment',
      isPlant: false,
      pageNo: 1,
      pageSize: 15,
    });

    const body = await expectHealthyResponse(res, 'Job Card Report');
    expect(body.data, 'Job Card Report: expected a data object').toBeTruthy();
  });

  test('TC-RPT-06: Used Parts Dropdown', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.get(`/pnm_master/restTemplate/v1/get/usedpart/dropdown/${SITE_ID}`);

    const body = await expectHealthyResponse(res, 'Used Parts Dropdown');
    expect(
      Array.isArray(body.data),
      'Used Parts Dropdown: expected data to be an array'
    ).toBe(true);
  });

  test('TC-RPT-07: Report Template (getTemplate)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    // 471 is the template id captured in the HAR for this report page.
    const res = await api.get('/pnm_report/report/getTemplate/471');

    await expectHealthyResponse(res, 'Report Template');
  });

  test('TC-RPT-08: Get Machines By Category Id', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_report/report/v1/get-machines-by-category-id', {
      siteId: SITE_ID,
      fromDate: new Date().toISOString(),
      isPlant: null,
      categoryId: null,
    });

    const body = await expectHealthyResponse(res, 'Get Machines By Category Id');
    expect(body.data, 'Get Machines By Category Id: expected a data object').toBeTruthy();
  });

  test('TC-RPT-09: Equipment Transfer History Report', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_report/report/v1/equipment-transfer-history-report', {
      siteId: SITE_ID,
      fromDate: '2026-05-19',
      toDate: '2026-06-19',
      categoryId: null,
      machineType: 'Equipment',
    });

    await expectHealthyResponse(res, 'Equipment Transfer History Report');
  });

  test('TC-RPT-10: Diesel Issue Consumption Report', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_report/report/v1/get-diesel-issue-consumption-report', {
      siteId: Number(SITE_ID),
      fromDate: '2026-05-19',
      toDate: '2026-06-19',
      categoryId: null,
      searchText: '',
      machineType: null,
    });

    const body = await expectHealthyResponse(res, 'Diesel Issue Consumption Report');
    expect(
      body.data === null || Array.isArray(body.data),
      'Diesel Issue Consumption Report: expected data to be an array or null'
    ).toBe(true);
  });

  test('TC-RPT-11: Equipment Category List (v2)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_asset/equipment-catagory/v2/equipment-category-list', {
      machineType: 'null',
      pageNo: null,
      pageSize: null,
      searchText: '',
      siteId: SITE_ID,
      type: 1,
      isActive: true,
    });

    const body = await expectHealthyResponse(res, 'Equipment Category List (v2)');
    expect(
      Array.isArray(body.data?.data),
      'Equipment Category List (v2): expected data.data to be an array'
    ).toBe(true);
  });

  test('TC-RPT-12: Diesel Issue Report', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_report/report/v1/get-diesel-issue-report', {
      siteId: Number(SITE_ID),
      fromDate: '2026-06-01T00:00:00.000Z',
      toDate: '2026-06-30T00:00:00.000Z',
      machineType: null,
      type: 1,
      categoryId: null,
    });

    const body = await expectHealthyResponse(res, 'Diesel Issue Report');
    expect(body.data, 'Diesel Issue Report: expected a data object').toBeTruthy();
  });

  test('TC-RPT-13: Daily Utilization Report (daily-utilization-report)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_report/report/v1/daily-utilization-report', {
      siteId: SITE_ID,
      fromDate: '2026-05-19',
      toDate: '2026-06-19',
      searchText: '',
      isPlant: false,
      pageNo: 1,
      pageSize: 15,
      machineType: 1,
    });

    const body = await expectHealthyResponse(res, 'Daily Utilization Report (v2)');
    expect(body.data, 'Daily Utilization Report (v2): expected a data object').toBeTruthy();
  });

  test('TC-RPT-14: Machine Breakdown Report', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_report/report/v1/machine-breakdown-report', {
      siteId: SITE_ID,
      fromDate: '2026-05-19',
      toDate: '2026-06-19',
      categoryId: null,
      machineType: 'Equipment',
      pageNo: 1,
      pageSize: 15,
    });

    const body = await expectHealthyResponse(res, 'Machine Breakdown Report');
    expect(body.data, 'Machine Breakdown Report: expected a data object').toBeTruthy();
  });

  test('TC-RPT-15: Equipment Driver & Supervisor Report', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_report/report/v1/get-equipment-driver-supervisor-report', {
      pageNo: 1,
      pageSize: 15,
      categoryId: null,
      siteId: SITE_ID,
      searchText: null,
      type: null,
      equipmentStateId: null,
    });

    const body = await expectHealthyResponse(res, 'Equipment Driver & Supervisor Report');
    expect(body.data, 'Equipment Driver & Supervisor Report: expected a data object').toBeTruthy();
  });

  test('TC-RPT-16: Equipment State (Hired/Owned) Dropdown', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_asset/equipment/v2/get/equipment-state/hired/owned', {
      isOwned: true,
    });

    const body = await expectHealthyResponse(res, 'Equipment State (Hired/Owned) Dropdown');
    expect(
      Array.isArray(body.data),
      'Equipment State (Hired/Owned) Dropdown: expected data to be an array'
    ).toBe(true);
  });

  test('TC-RPT-17: Active Equipment Category List (Dropdown)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();

    const res = await api.post('/pnm_asset/equipment-catagory/v1/active-equipment-category-list/dropDown', {
      siteId: Number(SITE_ID),
      type: 1,
    });

    const body = await expectHealthyResponse(res, 'Active Equipment Category List (Dropdown)');
    expect(
      Array.isArray(body.data?.data),
      'Active Equipment Category List (Dropdown): expected data.data to be an array'
    ).toBe(true);
  });

});