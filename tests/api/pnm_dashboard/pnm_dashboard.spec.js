const { test, expect } = require('@playwright/test');
const { ApiClient, validateApiResponse } = require('../../../utils/apiHelper');

test.describe.parallel('@api @dashboard — Dashboard Service (pnm_dashboard)', () => { 
  let api;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
    await api.login();
  });

  test('TC-DSH-001: [GET] /pnm_dashboard/dash-board/get/permission/1554 - Dash Board Permission', async () => {
    const res = await api.get('/pnm_dashboard/dash-board/get/permission/1554');
    await validateApiResponse(res, {
      service: 'pnm_dashboard',
      endpoint: '/pnm_dashboard/dash-board/get/permission/1554',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-DSH-002: [POST] /pnm_dashboard/equipment-dashboard/v1/get - Equipment Dashboard', async () => {
    const payload = {"siteId": 1554, "card": null, "timePeriod": 2, "refresh": false, "machineType": 1};
    const res = await api.post('/pnm_dashboard/equipment-dashboard/v1/get', payload);
    await validateApiResponse(res, {
      service: 'pnm_dashboard',
      endpoint: '/pnm_dashboard/equipment-dashboard/v1/get',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DSH-003: [POST] /pnm_dashboard/equipment-dashboard/v1/get-utilization - Equipment Dashboard Get Utilization', async () => {
    const payload = {"siteId": 1554, "card": null, "timePeriod": 2, "refresh": false, "machineType": 1, "fromDate": "2026-10-16", "toDate": "2026-11-16"};
    const res = await api.post('/pnm_dashboard/equipment-dashboard/v1/get-utilization', payload);
    await validateApiResponse(res, {
      service: 'pnm_dashboard',
      endpoint: '/pnm_dashboard/equipment-dashboard/v1/get-utilization',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DSH-004: [POST] /pnm_dashboard/equipment-dashboard/v1/get-machine-perfomance - Equipment Dashboard Get Machine Perfomance', async () => {
    const payload = {"siteId": 1554, "card": "MILAIGE_PERFOMANCE", "timePeriod": 2, "refresh": false, "machineType": 1, "fromDate": "2026-10-16", "toDate": "2026-11-16"};
    const res = await api.post('/pnm_dashboard/equipment-dashboard/v1/get-machine-perfomance', payload);
    await validateApiResponse(res, {
      service: 'pnm_dashboard',
      endpoint: '/pnm_dashboard/equipment-dashboard/v1/get-machine-perfomance',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DSH-005: [POST] /pnm_dashboard/equipment-dashboard/v1/vehicle-compliance - Equipment Dashboard Vehicle Compliance', async () => {
    const payload = {"siteId": 1554, "card": null, "timePeriod": 2, "refresh": false, "machineType": 1, "filter": "ALL"};
    const res = await api.post('/pnm_dashboard/equipment-dashboard/v1/vehicle-compliance', payload);
    await validateApiResponse(res, {
      service: 'pnm_dashboard',
      endpoint: '/pnm_dashboard/equipment-dashboard/v1/vehicle-compliance',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DSH-006: [POST] /pnm_dashboard/dash-board/get/role-permission - Dash Board Role Permission', async () => {
    const payload = {"employeeId": 0, "id": 0, "roleId": 95, "siteId": 1554};
    const res = await api.post('/pnm_dashboard/dash-board/get/role-permission', payload);
    await validateApiResponse(res, {
      service: 'pnm_dashboard',
      endpoint: '/pnm_dashboard/dash-board/get/role-permission',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DSH-007: [POST] /pnm_dashboard/dash-board/get/employee-permission - Dash Board Employee Permission', async () => {
    const payload = {"employeeId": 3, "id": 0, "roleId": 0, "siteId": 1554};
    const res = await api.post('/pnm_dashboard/dash-board/get/employee-permission', payload);
    await validateApiResponse(res, {
      service: 'pnm_dashboard',
      endpoint: '/pnm_dashboard/dash-board/get/employee-permission',
      method: 'POST',
      expectedStatus: 200,
    });
  });

});
