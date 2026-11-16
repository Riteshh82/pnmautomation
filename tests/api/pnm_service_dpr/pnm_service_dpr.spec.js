const { test, expect } = require('@playwright/test');
const { ApiClient, validateApiResponse } = require('../../../utils/apiHelper');

test.describe.parallel('@api @dpr — DPR / Service Management (pnm_service_dpr)', () => { 
  let api;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
    await api.login();
  });

  test('TC-DPR-001: [POST] /pnm_service_dpr/gatepass/v1/get-site-address - Gatepass Get Site Address', async () => {
    const payload = {"pageNo": null, "pageSize": null};
    const res = await api.post('/pnm_service_dpr/gatepass/v1/get-site-address', payload);
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/gatepass/v1/get-site-address',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-002: [POST] /pnm_service_dpr/plan-for-service/v2/equipment-list-service - Plan For Service Equipment List Service', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "siteId": "1554", "machineType": 1};
    const res = await api.post('/pnm_service_dpr/plan-for-service/v2/equipment-list-service', payload);
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/plan-for-service/v2/equipment-list-service',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-003: [POST] /pnm_service_dpr/hybrid/v1/get/all/service-schedule-list - Hybrid Service Schedule List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "siteId": "1554", "machineTypeId": 1, "isPlant": false, "engineStateId": null};
    const res = await api.post('/pnm_service_dpr/hybrid/v1/get/all/service-schedule-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/hybrid/v1/get/all/service-schedule-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-004: [GET] /pnm_service_dpr/service/v1/get/all/service-type - Service Service Type', async () => {
    const res = await api.get('/pnm_service_dpr/service/v1/get/all/service-type');
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/service/v1/get/all/service-type',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-005: [GET] /pnm_service_dpr/hybrid/get/engine-state-list - Hybrid Engine State List', async () => {
    const res = await api.get('/pnm_service_dpr/hybrid/get/engine-state-list');
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/hybrid/get/engine-state-list',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-006: [GET] /pnm_service_dpr/service-task/v1/active-service-task-list - Service Task Active Service Task List', async () => {
    const res = await api.get('/pnm_service_dpr/service-task/v1/active-service-task-list');
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/service-task/v1/active-service-task-list',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-007: [GET] /pnm_service_dpr/service-provider/v1/service-provider-list - Service Provider Service Provider List', async () => {
    const res = await api.get('/pnm_service_dpr/service-provider/v1/service-provider-list');
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/service-provider/v1/service-provider-list',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-008: [GET] /pnm_service_dpr/tax-type/v1/tax-type - Tax Type Tax Type', async () => {
    const res = await api.get('/pnm_service_dpr/tax-type/v1/tax-type');
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/tax-type/v1/tax-type',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-009: [GET] /pnm_service_dpr/service-type/v1/active-service-type-list - Service Type Active Service Type List', async () => {
    const res = await api.get('/pnm_service_dpr/service-type/v1/active-service-type-list');
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/service-type/v1/active-service-type-list',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-010: [POST] /pnm_service_dpr/hybrid/next-action - Hybrid Next Action', async () => {
    const payload = {"siteId": 1554, "id": 1285};
    const res = await api.post('/pnm_service_dpr/hybrid/next-action', payload);
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/hybrid/next-action',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-011: [POST] /pnm_service_dpr/hybrid/v2/service-info - Hybrid Service Info', async () => {
    const payload = {"id": 1285};
    const res = await api.post('/pnm_service_dpr/hybrid/v2/service-info', payload);
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/hybrid/v2/service-info',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-012: [POST] /pnm_service_dpr/plan-for-service/v1/mobile-scheduled-service-list - Plan For Service Mobile Scheduled Service List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "searchText": "", "siteId": "1554", "equipState": null, "isPlant": false, "isCompleted": true, "fromDate": null, "toDate": null, "machineTypeId": 1};
    const res = await api.post('/pnm_service_dpr/plan-for-service/v1/mobile-scheduled-service-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/plan-for-service/v1/mobile-scheduled-service-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-013: [POST] /pnm_service_dpr/accidental/v1/accidental-equipment-list - Accidental Accidental Equipment List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "searchText": "", "siteId": "1554", "isPlant": null, "isOtherAsset": null};
    const res = await api.post('/pnm_service_dpr/accidental/v1/accidental-equipment-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/accidental/v1/accidental-equipment-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-014: [POST] /pnm_service_dpr/dpr/v1/get-all - Dpr Get All', async () => {
    const payload = {"siteId": "1554", "isOwned": null, "fromDate": "2026-11-16", "shiftId": null, "machineType": "Equipment", "categoryId": null, "pageNo": 1, "pageSize": 10, "searchText": null};
    const res = await api.post('/pnm_service_dpr/dpr/v1/get-all', payload);
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/dpr/v1/get-all',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-015: [POST] /pnm_service_dpr/dpr/next-action - Dpr Next Action', async () => {
    const payload = {"id": null, "siteId": "1554"};
    const res = await api.post('/pnm_service_dpr/dpr/next-action', payload);
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/dpr/next-action',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-016: [POST] /pnm_service_dpr/gatepass/v1/gatepass-list - Gatepass Gatepass List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "siteId": "1554", "machineType": "Equipment"};
    const res = await api.post('/pnm_service_dpr/gatepass/v1/gatepass-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/gatepass/v1/gatepass-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-017: [POST] /pnm_service_dpr/gatepass/v1/getChallan - Gatepass Getchallan', async () => {
    const payload = {"id": 1449};
    const res = await api.post('/pnm_service_dpr/gatepass/v1/getChallan', payload);
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/gatepass/v1/getChallan',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-DPR-018: [POST] /pnm_service_dpr/gatepass/v1/generate-pdf - Gatepass Generate Pdf', async () => {
    const payload = {"id": 1449, "siteId": 1554, "userId": "3"};
    const res = await api.post('/pnm_service_dpr/gatepass/v1/generate-pdf', payload);
    await validateApiResponse(res, {
      service: 'pnm_service_dpr',
      endpoint: '/pnm_service_dpr/gatepass/v1/generate-pdf',
      method: 'POST',
      expectedStatus: 200,
    });
  });

});
