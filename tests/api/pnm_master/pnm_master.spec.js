const { test, expect } = require('@playwright/test');
const { ApiClient, validateApiResponse } = require('../../../utils/apiHelper');

test.describe.parallel('@api @master — Master Service (pnm_master)', () => { 
  let api;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
    await api.login();
  });

  test('TC-MTR-001: [GET] /pnm_master/company/1 - Company', async () => {
    const res = await api.get('/pnm_master/company/1');
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/company/1',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-002: [GET] /pnm_master/site/user_sites - Site User Sites', async () => {
    const res = await api.get('/pnm_master/site/user_sites');
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/site/user_sites',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-003: [GET] /pnm_master/app-menu/v1/get/all/byUser/1554 - App Menu Byuser', async () => {
    const res = await api.get('/pnm_master/app-menu/v1/get/all/byUser/1554');
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/app-menu/v1/get/all/byUser/1554',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-004: [POST] /pnm_master/employee/v1/employee-list - Employee Employee List', async () => {
    const payload = {"pageNo": null, "pageSize": null};
    const res = await api.post('/pnm_master/employee/v1/employee-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/employee/v1/employee-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-005: [POST] /pnm_master/unit/v1/unit-list - Unit Unit List', async () => {
    const payload = {"pageNo": 0, "pageSize": 15, "searchText": "", "engineStateId": 3, "siteId": "1554"};
    const res = await api.post('/pnm_master/unit/v1/unit-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/unit/v1/unit-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-006: [POST] /pnm_master/fuel-type/v2/fuel-type-list - Fuel Type Fuel Type List', async () => {
    const payload = {"pageNo": 0, "pageSize": 15, "siteId": "1554"};
    const res = await api.post('/pnm_master/fuel-type/v2/fuel-type-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/fuel-type/v2/fuel-type-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-007: [POST] /pnm_master/document-type/v2/document-type-list - Document Type Document Type List', async () => {
    const payload = {"pageNo": 0, "pageSize": 50, "companyId": "1", "siteId": "1554"};
    const res = await api.post('/pnm_master/document-type/v2/document-type-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/document-type/v2/document-type-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-008: [POST] /pnm_master/document-type/v1/all/document-category - Document Type Document Category', async () => {
    const payload = {"siteId": "1554"};
    const res = await api.post('/pnm_master/document-type/v1/all/document-category', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/document-type/v1/all/document-category',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-009: [POST] /pnm_master/service-type/v2/service-type-list - Service Type Service Type List', async () => {
    const payload = {"pageNo": 0, "pageSize": 15, "siteId": "1554"};
    const res = await api.post('/pnm_master/service-type/v2/service-type-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/service-type/v2/service-type-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-010: [POST] /pnm_master/restTemplate/v1/getItem/FinalSuccessList - Resttemplate Getitem Finalsuccesslist', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "equipmentCategoryId": null, "isUsedForMechanical": true, "categoryId": null, "isMixDesign": null, "isMixDesignConfigNeeded": null, "isSalePriceNeeded": null, "isStockNeeded": null, "isVariantAllowed": null, "siteId": "1554"};
    const res = await api.post('/pnm_master/restTemplate/v1/getItem/FinalSuccessList', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/restTemplate/v1/getItem/FinalSuccessList',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-011: [POST] /pnm_master/service-task/v2/service-task-list - Service Task Service Task List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "siteId": "1554"};
    const res = await api.post('/pnm_master/service-task/v2/service-task-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/service-task/v2/service-task-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-012: [POST] /pnm_master/equipment-service-schedule/v2/equipment-service-schedule-list - Equipment Service Schedule Equipment Service Schedule List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "siteId": "1554"};
    const res = await api.post('/pnm_master/equipment-service-schedule/v2/equipment-service-schedule-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/equipment-service-schedule/v2/equipment-service-schedule-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-013: [POST] /pnm_master/service-task/v1/active-service-task-list - Service Task Active Service Task List', async () => {
    const payload = {"pageNo": 1, "pageSize": 1000, "siteId": "1554"};
    const res = await api.post('/pnm_master/service-task/v1/active-service-task-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/service-task/v1/active-service-task-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-014: [POST] /pnm_master/owner/v2/owner-list - Owner Owner List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "statusFilter": null, "typeId": 5, "companyId": "1", "siteId": "1554"};
    const res = await api.post('/pnm_master/owner/v2/owner-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/owner/v2/owner-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-015: [POST] /pnm_master/workorder/v2/workorder-list - Workorder Workorder List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "siteId": "1554"};
    const res = await api.post('/pnm_master/workorder/v2/workorder-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/workorder/v2/workorder-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-016: [POST] /pnm_master/engineer/v2/get-all-external-engineer - Engineer Get All External Engineer', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "siteId": "1554"};
    const res = await api.post('/pnm_master/engineer/v2/get-all-external-engineer', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/engineer/v2/get-all-external-engineer',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-017: [POST] /pnm_master/engineer/v1/get-exengg-companies - Engineer Get Exengg Companies', async () => {
    const payload = {"pageNo": 0, "pageSize": 0};
    const res = await api.post('/pnm_master/engineer/v1/get-exengg-companies', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/engineer/v1/get-exengg-companies',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-018: [POST] /pnm_master/unit/v1/active-unit-list - Unit Active Unit List', async () => {
    const payload = {"pageNo": 0, "pageSize": 0, "userDetail": {"companyId": 0}};
    const res = await api.post('/pnm_master/unit/v1/active-unit-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/unit/v1/active-unit-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-019: [POST] /pnm_master/equipment-driver/v1/get-list - Equipment Driver Get List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "isOwned": null, "categoryId": null, "siteId": "1554"};
    const res = await api.post('/pnm_master/equipment-driver/v1/get-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/equipment-driver/v1/get-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-020: [POST] /pnm_master/equipment-driver/v1/get-equipment-category-list - Equipment Driver Get Equipment Category List', async () => {
    const payload = {"designationId": 1388, "isActive": true};
    const res = await api.post('/pnm_master/equipment-driver/v1/get-equipment-category-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/equipment-driver/v1/get-equipment-category-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-021: [POST] /pnm_master/equipment-driver/v1/get-employee-with-designation - Equipment Driver Get Employee With Designation', async () => {
    const payload = {"designationId": 1388, "isActive": true, "pageNo": 1, "pageSize": 50, "searchText": ""};
    const res = await api.post('/pnm_master/equipment-driver/v1/get-employee-with-designation', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/equipment-driver/v1/get-employee-with-designation',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-022: [POST] /pnm_master/chainage/v1/chainage-list - Chainage Chainage List', async () => {
    const payload = {"siteId": "1554"};
    const res = await api.post('/pnm_master/chainage/v1/chainage-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/chainage/v1/chainage-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-023: [POST] /pnm_master/equipment-supervisor/v1/get-list - Equipment Supervisor Get List', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "searchText": "", "isOwned": null, "categoryId": null, "siteId": "1554"};
    const res = await api.post('/pnm_master/equipment-supervisor/v1/get-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/equipment-supervisor/v1/get-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-024: [POST] /pnm_master/account/all/client - Account Client', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "search": null, "statusFilter": null, "companyId": "1", "typeId": null, "panNo": null};
    const res = await api.post('/pnm_master/account/all/client', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/account/all/client',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-025: [POST] /pnm_master/account/all/transporter - Account Transporter', async () => {
    const payload = {"pageNo": 1, "pageSize": 15, "search": null, "statusFilter": true, "companyId": "1", "typeId": null};
    const res = await api.post('/pnm_master/account/all/transporter', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/account/all/transporter',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-026: [POST] /pnm_master/wo_tnc_type/wo_tnc_types - Wo Tnc Type Wo Tnc Types', async () => {
    const payload = {"companyId": "1", "siteId": "1554", "includeInactive": true, "userId": "3"};
    const res = await api.post('/pnm_master/wo_tnc_type/wo_tnc_types', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/wo_tnc_type/wo_tnc_types',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-027: [POST] /pnm_master/wo_tnc/tnc_types_tncs - Wo Tnc Tnc Types Tncs', async () => {
    const payload = {"companyId": "1", "isActive": true, "siteId": "1554", "userId": "3"};
    const res = await api.post('/pnm_master/wo_tnc/tnc_types_tncs', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/wo_tnc/tnc_types_tncs',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-028: [POST] /pnm_master/fuel-type/v1/active-fuel-type-list - Fuel Type Active Fuel Type List', async () => {
    const payload = {"pageNo": null, "pageSize": null};
    const res = await api.post('/pnm_master/fuel-type/v1/active-fuel-type-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/fuel-type/v1/active-fuel-type-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-029: [GET] /pnm_master/account/get/accountTemplate - Account Accounttemplate', async () => {
    const res = await api.get('/pnm_master/account/get/accountTemplate');
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/account/get/accountTemplate',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-030: [POST] /pnm_master/document-type/v1/active-document-type-list - Document Type Active Document Type List', async () => {
    const payload = {"pageNo": 0, "pageSize": 100};
    const res = await api.post('/pnm_master/document-type/v1/active-document-type-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/document-type/v1/active-document-type-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-031: [POST] /pnm_master/owner/v1/active-owner-list - Owner Active Owner List', async () => {
    const payload = {"statusFilter": true, "typeId": 5, "companyId": "1", "isForWorkOrderPage": false};
    const res = await api.post('/pnm_master/owner/v1/active-owner-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/owner/v1/active-owner-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-032: [POST] /pnm_master/employee/v1/employee-supervisor-list - Employee Employee Supervisor List', async () => {
    const payload = {"siteId": "1554", "isPlant": false};
    const res = await api.post('/pnm_master/employee/v1/employee-supervisor-list', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/employee/v1/employee-supervisor-list',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-033: [GET] /pnm_master/restTemplate/v1/get/usedpart/dropdown/102 - Resttemplate Usedpart Dropdown', async () => {
    const res = await api.get('/pnm_master/restTemplate/v1/get/usedpart/dropdown/102');
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/restTemplate/v1/get/usedpart/dropdown/102',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-034: [GET] /pnm_master/serialNumberGenrator/getAllTransactionEntitesType - Serialnumbergenrator Getalltransactionentitestype', async () => {
    const res = await api.get('/pnm_master/serialNumberGenrator/getAllTransactionEntitesType');
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/serialNumberGenrator/getAllTransactionEntitesType',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-035: [POST] /pnm_master/serialNumberGenrator/v1/get/all - Serialnumbergenrator', async () => {
    const payload = {"fromDate": null, "pageNumber": 1, "pageSize": 15, "searchFilter": "", "siteId": "1554", "statusFilter": true, "toDate": null, "entityId": null, "isCompanyLevelConfigurationWant": false};
    const res = await api.post('/pnm_master/serialNumberGenrator/v1/get/all', payload);
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/serialNumberGenrator/v1/get/all',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-036: [GET] /pnm_master/serialNumberGenrator/getAllVariableType - Serialnumbergenrator Getallvariabletype', async () => {
    const res = await api.get('/pnm_master/serialNumberGenrator/getAllVariableType');
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/serialNumberGenrator/getAllVariableType',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-037: [GET] /pnm_master/app-menu/v1/get/all/RoleByCompanyId - App Menu Rolebycompanyid', async () => {
    const res = await api.get('/pnm_master/app-menu/v1/get/all/RoleByCompanyId');
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/app-menu/v1/get/all/RoleByCompanyId',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-MTR-038: [GET] /pnm_master/app-menu/v1/get/all/byCompany/95 - App Menu Bycompany', async () => {
    const res = await api.get('/pnm_master/app-menu/v1/get/all/byCompany/95');
    await validateApiResponse(res, {
      service: 'pnm_master',
      endpoint: '/pnm_master/app-menu/v1/get/all/byCompany/95',
      method: 'GET',
      expectedStatus: 200,
    });
  });

});
