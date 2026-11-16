const { test, expect } = require('@playwright/test');
const { ApiClient, validateApiResponse } = require('../../../utils/apiHelper');

test.describe('@api @report — Report Service (pnm_report)', () => { 
  let api;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
    await api.login();
  });

  test('TC-REP-001: [POST] /pnm_report/report/v1/equipment-document-report - Report Equipment Document Report', async () => {
    const payload = {"pageSize": 10, "pageNo": 1, "siteId": "1554", "isPlant": false};
    const res = await api.post('/pnm_report/report/v1/equipment-document-report', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/equipment-document-report',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-002: [POST] /pnm_report/report/v1/equipment/status/report-export - Report Equipment Status Report Export', async () => {
    const payload = {"siteId": "1554", "isPlant": false};
    const res = await api.post('/pnm_report/report/v1/equipment/status/report-export', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/equipment/status/report-export',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-003: [POST] /pnm_report/report/v1/get-daily-utilization-report - Report Get Daily Utilization Report', async () => {
    const payload = {"siteId": "1554", "month": 10, "year": 2026, "shiftId": null, "isOwned": null, "pageNo": 1, "pageSize": 15, "isPlant": false, "categoryId": null, "machineType": "1"};
    const res = await api.post('/pnm_report/report/v1/get-daily-utilization-report', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/get-daily-utilization-report',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-004: [POST] /pnm_report/report/v1/get-daily-utilization-report/export-excel - Report Get Daily Utilization Report Export Excel', async () => {
    const payload = {"siteId": "1554", "month": 10, "year": 2026, "shiftId": null, "isOwned": null, "isPlant": false, "categoryId": null, "machineType": "1", "searchText": ""};
    const res = await api.post('/pnm_report/report/v1/get-daily-utilization-report/export-excel', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/get-daily-utilization-report/export-excel',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-005: [POST] /pnm_report/report/v1/tyre-battery-consumption-report - Report Tyre Battery Consumption Report', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "siteId": "1554", "fromDate": "2026-11-16", "toDate": "2026-11-16", "partType": 1};
    const res = await api.post('/pnm_report/report/v1/tyre-battery-consumption-report', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/tyre-battery-consumption-report',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-006: [POST] /pnm_report/report/v1/out-site-machine-report - Report Out Site Machine Report', async () => {
    const payload = {"siteId": "1554", "fromDate": "2026-10-16", "toDate": "2026-11-16", "machineType": "Equipment", "pageNo": 1, "pageSize": 15};
    const res = await api.post('/pnm_report/report/v1/out-site-machine-report', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/out-site-machine-report',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-007: [POST] /pnm_report/report/v1/out-site-machine-report/excel-export - Report Out Site Machine Report Excel Export', async () => {
    const payload = {"siteId": "1554", "fromDate": "2026-10-16", "toDate": "2026-11-16", "machineType": "Equipment"};
    const res = await api.post('/pnm_report/report/v1/out-site-machine-report/excel-export', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/out-site-machine-report/excel-export',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-008: [POST] /pnm_report/report/v1/get-jobcard-report - Report Get Jobcard Report', async () => {
    const payload = {"siteId": "1554", "fromDate": "2026-10-16", "toDate": "2026-11-16", "machineType": "Equipment", "isPlant": false, "pageNo": 1, "pageSize": 15, "isReady": null};
    const res = await api.post('/pnm_report/report/v1/get-jobcard-report', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/get-jobcard-report',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-009: [GET] /pnm_report/report/getTemplate/471 - Report Gettemplate', async () => {
    const res = await api.get('/pnm_report/report/getTemplate/471');
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/getTemplate/471',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-REP-010: [POST] /pnm_report/report/generateReport - Report Generatereport', async () => {
    const payload = {"siteId": "1554", "fromDate": "2026-10-16", "toDate": "2026-11-16", "machineType": "Equipment", "isPlant": false, "reportId": null, "isReady": null};
    const res = await api.post('/pnm_report/report/generateReport', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/generateReport',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-011: [POST] /pnm_report/report/v1/equipment-transfer-history-report - Report Equipment Transfer History Report', async () => {
    const payload = {"siteId": "1554", "fromDate": "2026-10-16", "toDate": "2026-11-16", "categoryId": null, "machineType": "Equipment"};
    const res = await api.post('/pnm_report/report/v1/equipment-transfer-history-report', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/equipment-transfer-history-report',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-012: [POST] /pnm_report/report/v1/get-diesel-issue-consumption-report - Report Get Diesel Issue Consumption Report', async () => {
    const payload = {"siteId": 1554, "fromDate": "2026-10-16", "toDate": "2026-11-16", "categoryId": null, "searchText": "", "machineType": null};
    const res = await api.post('/pnm_report/report/v1/get-diesel-issue-consumption-report', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/get-diesel-issue-consumption-report',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-013: [POST] /pnm_report/report/v1/get-diesel-issue-report - Report Get Diesel Issue Report', async () => {
    const payload = {"siteId": 1554, "fromDate": "2026-11-01T00:00:00.000Z", "toDate": "2026-11-30T00:00:00.000Z", "machineType": null, "type": 1, "categoryId": null};
    const res = await api.post('/pnm_report/report/v1/get-diesel-issue-report', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/get-diesel-issue-report',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-014: [POST] /pnm_report/report/v1/get-diesel-issue-summary-report - Report Get Diesel Issue Summary Report', async () => {
    const payload = {"siteId": "1554", "fromDate": "2026-10-16", "toDate": "2026-11-16", "searchText": ""};
    const res = await api.post('/pnm_report/report/v1/get-diesel-issue-summary-report', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/get-diesel-issue-summary-report',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-015: [POST] /pnm_report/report/v1/get-equipment-driver-supervisor-report - Report Get Equipment Driver Supervisor Report', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "categoryId": null, "siteId": "1554", "searchText": null, "type": null, "equipmentStateId": null};
    const res = await api.post('/pnm_report/report/v1/get-equipment-driver-supervisor-report', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/get-equipment-driver-supervisor-report',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-016: [POST] /pnm_report/report/v1/get-equipment-driver-supervisor-report-export - Report Get Equipment Driver Supervisor Report Export', async () => {
    const payload = {"categoryId": null, "siteId": "1554", "searchText": null, "machineState": null, "isOwned": null};
    const res = await api.post('/pnm_report/report/v1/get-equipment-driver-supervisor-report-export', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/get-equipment-driver-supervisor-report-export',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-017: [POST] /pnm_report/report/v1/daily-utilization-report - Report Daily Utilization Report', async () => {
    const payload = {"siteId": "1554", "fromDate": "2026-10-16", "toDate": "2026-11-16", "searchText": "", "isPlant": false, "pageNo": 1, "pageSize": 15, "machineType": 1};
    const res = await api.post('/pnm_report/report/v1/daily-utilization-report', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/daily-utilization-report',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-018: [POST] /pnm_report/report/v1/daily-utilization-report-export - Report Daily Utilization Report Export', async () => {
    const payload = {"siteId": "1554", "isPlant": false, "fromDate": "2026-10-16", "toDate": "2026-11-16", "machineType": 1};
    const res = await api.post('/pnm_report/report/v1/daily-utilization-report-export', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/daily-utilization-report-export',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-019: [POST] /pnm_report/report/v1/machine-breakdown-report - Report Machine Breakdown Report', async () => {
    const payload = {"siteId": "1554", "fromDate": "2026-10-16", "toDate": "2026-11-16", "categoryId": null, "machineType": "Equipment", "pageNo": 1, "pageSize": 15, "isForBreakdown": null};
    const res = await api.post('/pnm_report/report/v1/machine-breakdown-report', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/machine-breakdown-report',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-020: [POST] /pnm_report/report/v1/machine-breakdown-report/excel-export - Report Machine Breakdown Report Excel Export', async () => {
    const payload = {"siteId": "1554", "fromDate": "2026-10-16", "toDate": "2026-11-16", "machineType": "Equipment", "categoryId": null, "isForBreakdown": null};
    const res = await api.post('/pnm_report/report/v1/machine-breakdown-report/excel-export', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/v1/machine-breakdown-report/excel-export',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-021: [POST] /pnm_report/report/internal-rental - Report Internal Rental', async () => {
    const payload = {"pageNo": 1, "pageSize": 1000, "searchText": "", "equipmentId": null, "fromDate": "2026-11-01", "toDate": "2026-11-16", "periodType": "dateWise", "transferSiteId": null, "purchaseSiteId": null, "categoryId": null, "siteId": null};
    const res = await api.post('/pnm_report/report/internal-rental', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/internal-rental',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-REP-022: [POST] /pnm_report/report/internal-rental/export - Report Internal Rental Export', async () => {
    const payload = {"pageNo": 1, "pageSize": 1000, "searchText": "", "equipmentId": null, "fromDate": "2026-11-01", "toDate": "2026-11-16", "periodType": "dateWise", "transferSiteId": null, "purchaseSiteId": null, "categoryId": null, "siteId": null, "exportType": "excel"};
    const res = await api.post('/pnm_report/report/internal-rental/export', payload);
    await validateApiResponse(res, {
      service: 'pnm_report',
      endpoint: '/pnm_report/report/internal-rental/export',
      method: 'POST',
      expectedStatus: 200,
    });
  });

});
