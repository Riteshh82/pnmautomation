const { test, expect } = require('@playwright/test');
const { ApiClient, validateApiResponse } = require('../../../utils/apiHelper');

test.describe.parallel('@api @asset — Asset Management Service (pnm_asset)', () => { 
  let api;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
    await api.login();
  });

  test('TC-AST-001: [POST] /pnm_asset/api/notification/v1/unread-notification-count - Api Notification Unread Notification Count', async () => {
    const payload = {"siteId": 1554};
    const res = await api.post('/pnm_asset/api/notification/v1/unread-notification-count', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/api/notification/v1/unread-notification-count',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-002: [POST] /pnm_asset/equipment-catagory/v1/new-template-categories - Equipment Catagory New Template Categories', async () => {
    const payload = {"siteId": "1554", "type": 1, "isActive": true};
    const res = await api.post('/pnm_asset/equipment-catagory/v1/new-template-categories', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment-catagory/v1/new-template-categories',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-003: [POST] /pnm_asset/equipment-catagory/v1/equipment-category-list-clone - Equipment Catagory Equipment Category List Clone', async () => {
    const payload = {"machineType": 0, "pageNo": 1, "pageSize": 15, "siteId": "1554", "type": 1, "isActive": null};
    const res = await api.post('/pnm_asset/equipment-catagory/v1/equipment-category-list-clone', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment-catagory/v1/equipment-category-list-clone',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-004: [POST] /pnm_asset/priority/v1/get-list - Priority Get List', async () => {
    const payload = {"machineType": 0, "pageNo": 1, "pageSize": 15, "userId": 3, "userCompanyId": 1, "userRoleId": 3, "siteId": "102", "type": 1};
    const res = await api.post('/pnm_asset/priority/v1/get-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/priority/v1/get-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-005: [POST] /pnm_asset/plant/v1/plant-type - Plant Plant Type', async () => {
    const payload = {"isActive": true};
    const res = await api.post('/pnm_asset/plant/v1/plant-type', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/plant/v1/plant-type',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-006: [GET] /pnm_asset/equipment-catagory/depreciation-method-dropdown - Equipment Catagory Depreciation Method Dropdown', async () => {
    const res = await api.get('/pnm_asset/equipment-catagory/depreciation-method-dropdown');
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment-catagory/depreciation-method-dropdown',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-AST-007: [POST] /pnm_asset/manufacture/v1/manufacturer-list - Manufacture Manufacturer List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "pageType": 1, "type": 1, "siteId": "1554"};
    const res = await api.post('/pnm_asset/manufacture/v1/manufacturer-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/manufacture/v1/manufacturer-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-008: [POST] /pnm_asset/equipment-model/v2/equipment-model-list - Equipment Model Equipment Model List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "searchText": "", "isActive": null, "type": 1, "siteId": "1554"};
    const res = await api.post('/pnm_asset/equipment-model/v2/equipment-model-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment-model/v2/equipment-model-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-009: [POST] /pnm_asset/manufacture/v1/active-manufacturer-list - Manufacture Active Manufacturer List', async () => {
    const payload = {"pageNo": 0, "pageSize": 0, "type": 1, "siteId": "1554"};
    const res = await api.post('/pnm_asset/manufacture/v1/active-manufacturer-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/manufacture/v1/active-manufacturer-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-010: [POST] /pnm_asset/equipment/v1/equipment-by-category-id - Equipment Equipment By Category Id', async () => {
    const payload = {"categoryId": null, "siteId": 1554, "isOwned": null, "isActive": true, "type": 1, "hideScrapAndScrapSold": false, "isPlant": false, "equipmentState": null, "listEquipmentDocument": false, "isContractorHire": null};
    const res = await api.post('/pnm_asset/equipment/v1/equipment-by-category-id', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment/v1/equipment-by-category-id',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-011: [POST] /pnm_asset/equipment/v2/get/equipment-state/hired/owned - Equipment Equipment State Hired Owned', async () => {
    const payload = {"isOwned": true};
    const res = await api.post('/pnm_asset/equipment/v2/get/equipment-state/hired/owned', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment/v2/get/equipment-state/hired/owned',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-012: [POST] /pnm_asset/equipment-catagory/v1/active-equipment-category-list/dropDown - Equipment Catagory Active Equipment Category List Dropdown', async () => {
    const payload = {"isOwned": null, "isPlant": false, "machineType": 1, "siteId": 1554};
    const res = await api.post('/pnm_asset/equipment-catagory/v1/active-equipment-category-list/dropDown', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment-catagory/v1/active-equipment-category-list/dropDown',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-013: [POST] /pnm_asset/equipment/v1/fitment/export - Equipment Fitment Export', async () => {
    const payload = {"siteId": 1554, "type": 1, "isPlant": false};
    const res = await api.post('/pnm_asset/equipment/v1/fitment/export', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment/v1/fitment/export',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-014: [POST] /pnm_asset/equipment/v1/equipment-by-category-id/excel-export - Equipment Equipment By Category Id Excel Export', async () => {
    const payload = {"siteId": 1554, "type": 1, "categoryId": null, "isOwned": null, "isActive": true, "hideScrapAndScrapSold": false, "listEquipmentDocument": false, "isContractorHire": null, "equipmentState": null, "isPlant": false};
    const res = await api.post('/pnm_asset/equipment/v1/equipment-by-category-id/excel-export', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment/v1/equipment-by-category-id/excel-export',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-015: [POST] /pnm_asset/equipment/v1/equipment-template-excel/export - Equipment Equipment Template Excel Export', async () => {
    const payload = {"isOwned": true, "isPlant": false, "machineType": 1};
    const res = await api.post('/pnm_asset/equipment/v1/equipment-template-excel/export', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment/v1/equipment-template-excel/export',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-016: [POST] /pnm_asset/sub_plant/get/all - Sub Plant', async () => {
    const payload = {"pageNo": 0, "pageSize": 50, "searchText": "", "companyId": "1", "siteId": "1554"};
    const res = await api.post('/pnm_asset/sub_plant/get/all', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/sub_plant/get/all',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-017: [POST] /pnm_asset/equipment/v1/equipment-list-category-id - Equipment Equipment List Category Id', async () => {
    const payload = {"categoryId": null, "siteId": "1554", "searchText": null, "pageNo": 1, "pageSize": 15, "type": 1, "isPlant": false};
    const res = await api.post('/pnm_asset/equipment/v1/equipment-list-category-id', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment/v1/equipment-list-category-id',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-018: [POST] /pnm_asset/equipment/v1/get-equipments-update-status - Equipment Get Equipments Update Status', async () => {
    const payload = {"type": 1, "searchText": null, "categoryId": null, "siteId": "1554", "pageNo": 1, "pageSize": 15, "isPlant": false};
    const res = await api.post('/pnm_asset/equipment/v1/get-equipments-update-status', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment/v1/get-equipments-update-status',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-019: [POST] /pnm_asset/other-asset/v1/category-list-clone - Other Asset Category List Clone', async () => {
    const payload = {"machineType": 0, "pageNo": 1, "pageSize": 15, "siteId": "1554", "type": 1, "isActive": null};
    const res = await api.post('/pnm_asset/other-asset/v1/category-list-clone', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/other-asset/v1/category-list-clone',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-020: [POST] /pnm_asset/other-asset/v1/manufacturer-list - Other Asset Manufacturer List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "pageType": 1, "type": 2, "siteId": "1554"};
    const res = await api.post('/pnm_asset/other-asset/v1/manufacturer-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/other-asset/v1/manufacturer-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-021: [POST] /pnm_asset/other-asset/v2/model-list - Other Asset Model List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "isActive": null, "searchText": "", "type": 2, "siteId": "1554"};
    const res = await api.post('/pnm_asset/other-asset/v2/model-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/other-asset/v2/model-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-022: [POST] /pnm_asset/other-asset/v1/active-manufacturer-list - Other Asset Active Manufacturer List', async () => {
    const payload = {"pageNo": 0, "pageSize": 0, "type": 2, "siteId": "1554"};
    const res = await api.post('/pnm_asset/other-asset/v1/active-manufacturer-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/other-asset/v1/active-manufacturer-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-023: [POST] /pnm_asset/other-asset/v1/active-category-list-others - Other Asset Active Category List Others', async () => {
    const payload = {"siteId": "1554", "type": 2, "isActive": true};
    const res = await api.post('/pnm_asset/other-asset/v1/active-category-list-others', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/other-asset/v1/active-category-list-others',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-024: [POST] /pnm_asset/other-asset/v1/by-category-id - Other Asset By Category Id', async () => {
    const payload = {"categoryId": null, "siteId": 1554, "equipmentState": null, "isOwned": null, "isActive": true, "type": 2, "hideScrapAndScrapSold": false, "isPlant": false, "equipmentSortColumn": "", "listEquipmentDocument": false};
    const res = await api.post('/pnm_asset/other-asset/v1/by-category-id', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/other-asset/v1/by-category-id',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-025: [POST] /pnm_asset/equipment-model/v1/active-equipment-model-list-by-manufactureId - Equipment Model Active Equipment Model List By Manufactureid', async () => {
    const payload = {"id": 169, "siteId": "1554"};
    const res = await api.post('/pnm_asset/equipment-model/v1/active-equipment-model-list-by-manufactureId', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment-model/v1/active-equipment-model-list-by-manufactureId',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-026: [POST] /pnm_asset/equipment-catagory/v2/equipment-category-list - Equipment Catagory Equipment Category List', async () => {
    const payload = {"machineType": "null", "pageNo": null, "pageSize": null, "searchText": "", "siteId": "1554", "type": 1, "isActive": true};
    const res = await api.post('/pnm_asset/equipment-catagory/v2/equipment-category-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment-catagory/v2/equipment-category-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-027: [POST] /pnm_asset/equipment/depreciation/history/equipment-list - Equipment Depreciation History Equipment List', async () => {
    const payload = {"siteId": 1554, "searchText": "", "pageNo": 1, "pageSize": 15};
    const res = await api.post('/pnm_asset/equipment/depreciation/history/equipment-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment/depreciation/history/equipment-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-028: [POST] /pnm_asset/equipment/depreciation/history/report - Equipment Depreciation History Report', async () => {
    const payload = {"siteId": 1554, "categoryId": null, "equipmentId": 2808, "pageNo": 1, "pageSize": 100, "schedulePeriod": "MONTHLY"};
    const res = await api.post('/pnm_asset/equipment/depreciation/history/report', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment/depreciation/history/report',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-029: [POST] /pnm_asset/equipment/depreciation/history/report/export - Equipment Depreciation History Report Export', async () => {
    const payload = {"siteId": 1554, "categoryId": null, "equipmentId": 2808, "schedulePeriod": "MONTHLY"};
    const res = await api.post('/pnm_asset/equipment/depreciation/history/report/export', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/equipment/depreciation/history/report/export',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-030: [POST] /pnm_asset/api/notification/v1/get-all - Api Notification Get All', async () => {
    const payload = {"siteId": 1554, "pageNo": 1, "pageSize": 20};
    const res = await api.post('/pnm_asset/api/notification/v1/get-all', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/api/notification/v1/get-all',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-031: [POST] /pnm_asset/mail/mapping/getAll - Mail Mapping Getall', async () => {
    const payload = {"pageNo": 1, "pageSize": 10};
    const res = await api.post('/pnm_asset/mail/mapping/getAll', payload);
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/mail/mapping/getAll',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-AST-032: [GET] /pnm_asset/mail/recipient-type/list - Mail Recipient Type List', async () => {
    const res = await api.get('/pnm_asset/mail/recipient-type/list');
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/mail/recipient-type/list',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-AST-033: [GET] /pnm_asset/mail/entity-type/list - Mail Entity Type List', async () => {
    const res = await api.get('/pnm_asset/mail/entity-type/list');
    await validateApiResponse(res, {
      service: 'pnm_asset',
      endpoint: '/pnm_asset/mail/entity-type/list',
      method: 'GET',
      expectedStatus: 200,
    });
  });

});
