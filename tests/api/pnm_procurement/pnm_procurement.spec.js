const { test, expect } = require('@playwright/test');
const { ApiClient, validateApiResponse } = require('../../../utils/apiHelper');

test.describe('@api @procurement — Procurement Service (pnm_procurement)', () => { 
  let api;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request);
    await api.login();
  });

  test('TC-PRC-001: [POST] /pnm_procurement/requisition/get/all - Requisition', async () => {
    const payload = {"pageNumber": 1, "pageSize": 15, "siteId": "1554", "engineStateId": null, "categoryId": null, "supplierId": null, "fromDate": "2026-10-16", "toDate": "2026-11-16"};
    const res = await api.post('/pnm_procurement/requisition/get/all', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/requisition/get/all',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-002: [GET] /pnm_procurement/item-type/getAll - Item Type Getall', async () => {
    const res = await api.get('/pnm_procurement/item-type/getAll');
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/item-type/getAll',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-003: [POST] /pnm_procurement/requisition/next-action - Requisition Next Action', async () => {
    const payload = {"id": null, "siteId": "1554"};
    const res = await api.post('/pnm_procurement/requisition/next-action', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/requisition/next-action',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-004: [GET] /pnm_procurement/equipment-category/get-hsn-code/136 - Equipment Category Get Hsn Code', async () => {
    const res = await api.get('/pnm_procurement/equipment-category/get-hsn-code/136');
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/equipment-category/get-hsn-code/136',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-005: [POST] /pnm_procurement/asset-allocation/get/all - Asset Allocation', async () => {
    const payload = {"pageNumber": 1, "pageSize": 15, "siteId": "1554", "fromDate": "2026-10-16", "toDate": "2026-11-16"};
    const res = await api.post('/pnm_procurement/asset-allocation/get/all', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/asset-allocation/get/all',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-006: [GET] /pnm_procurement/integration/getAllApplicableIssueToType - Integration Getallapplicableissuetotype', async () => {
    const res = await api.get('/pnm_procurement/integration/getAllApplicableIssueToType');
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/integration/getAllApplicableIssueToType',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-007: [GET] /pnm_procurement/integration/issue_slip/get/nature - Integration Issue Slip Nature', async () => {
    const res = await api.get('/pnm_procurement/integration/issue_slip/get/nature');
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/integration/issue_slip/get/nature',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-008: [POST] /pnm_procurement/asset-allocation/next-action - Asset Allocation Next Action', async () => {
    const payload = {"id": null, "siteId": "1554"};
    const res = await api.post('/pnm_procurement/asset-allocation/next-action', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/asset-allocation/next-action',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-009: [POST] /pnm_procurement/integration/get/issueToListByCompanyId - Integration Issuetolistbycompanyid', async () => {
    const payload = {"siteId": "1554", "isActive": true, "statusFilter": true, "getFromWorkOrderMapping": true, "pageNo": 1, "pageSize": 100, "searchField": "", "applicableIssueToTypeId": 3};
    const res = await api.post('/pnm_procurement/integration/get/issueToListByCompanyId', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/integration/get/issueToListByCompanyId',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-010: [POST] /pnm_procurement/integration/structure/v2/get/all/final_success - Integration Structure Final Success', async () => {
    const payload = {"siteId": "1554", "pageNumber": 1, "pageSize": 100, "searchFilter": null, "searchField": ""};
    const res = await api.post('/pnm_procurement/integration/structure/v2/get/all/final_success', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/integration/structure/v2/get/all/final_success',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-011: [POST] /pnm_procurement/issue-slip/get/all - Issue Slip', async () => {
    const payload = {"siteId": "1554", "engineStateId": null, "searchText": "", "categoryId": null, "supplierId": null, "openState": null, "pageNo": 1, "pageSize": 15, "fromDate": "2026-10-16", "toDate": "2026-11-16", "searchIssueTo": null};
    const res = await api.post('/pnm_procurement/issue-slip/get/all', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/issue-slip/get/all',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-012: [GET] /pnm_procurement/indent/get/all/entity-state-mapping - Indent Entity State Mapping', async () => {
    const res = await api.get('/pnm_procurement/indent/get/all/entity-state-mapping');
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/indent/get/all/entity-state-mapping',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-013: [POST] /pnm_procurement/indent/get/all - Indent', async () => {
    const payload = {"engineStateId": null, "searchText": "", "categoryId": null, "supplierId": null, "openState": "", "pageNo": 1, "pageSize": 10, "siteId": "1554", "fromDate": "2026-10-16T00:00:00", "toDate": "2026-11-16T23:59:59"};
    const res = await api.post('/pnm_procurement/indent/get/all', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/indent/get/all',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-014: [POST] /pnm_procurement/indent/next-action - Indent Next Action', async () => {
    const payload = {"id": null, "siteId": "1554"};
    const res = await api.post('/pnm_procurement/indent/next-action', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/indent/next-action',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-015: [POST] /pnm_procurement/indent/latest-po-date-rate - Indent Latest Po Date Rate', async () => {
    const payload = {"id": 132};
    const res = await api.post('/pnm_procurement/indent/latest-po-date-rate', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/indent/latest-po-date-rate',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-016: [POST] /pnm_procurement/po/get/all - Po', async () => {
    const payload = {"engineStateId": null, "searchText": "", "categoryId": null, "supplierId": null, "openState": 1, "pageNo": 1, "pageSize": 15, "siteId": "1554", "fromDate": "2026-10-16T00:00:00", "toDate": "2026-11-16T23:59:59"};
    const res = await api.post('/pnm_procurement/po/get/all', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/po/get/all',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-017: [POST] /pnm_procurement/po/get/all/entity-state-mapping - Po Entity State Mapping', async () => {
    const payload = {"entityIds": [357]};
    const res = await api.post('/pnm_procurement/po/get/all/entity-state-mapping', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/po/get/all/entity-state-mapping',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-018: [POST] /pnm_procurement/po/get/info - Po Info', async () => {
    const payload = {"id": 209, "isForMrn": false};
    const res = await api.post('/pnm_procurement/po/get/info', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/po/get/info',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-019: [GET] /pnm_procurement/utility/getCompanyProfile/1/1554 - Utility Getcompanyprofile', async () => {
    const res = await api.get('/pnm_procurement/utility/getCompanyProfile/1/1554');
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/utility/getCompanyProfile/1/1554',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-020: [POST] /pnm_procurement/po/v1/get/trail - Po Trail', async () => {
    const payload = {"id": 209};
    const res = await api.post('/pnm_procurement/po/v1/get/trail', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/po/v1/get/trail',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-021: [GET] /pnm_procurement/purchase-order-dispatch/purchase-order/187 - Purchase Order Dispatch Purchase Order', async () => {
    const res = await api.get('/pnm_procurement/purchase-order-dispatch/purchase-order/187');
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/purchase-order-dispatch/purchase-order/187',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-022: [POST] /pnm_procurement/integration/get/all-transporter - Integration All Transporter', async () => {
    const payload = {"siteId": "1554", "companyId": "1"};
    const res = await api.post('/pnm_procurement/integration/get/all-transporter', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/integration/get/all-transporter',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-023: [POST] /pnm_procurement/purchase-order-dispatch/next-action - Purchase Order Dispatch Next Action', async () => {
    const payload = {"siteId": "1554", "id": null};
    const res = await api.post('/pnm_procurement/purchase-order-dispatch/next-action', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/purchase-order-dispatch/next-action',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-024: [POST] /pnm_procurement/integration/account/all/vendor - Integration Account Vendor', async () => {
    const payload = {"companyId": "1", "pageNo": 1, "pageSize": 500, "typeId": null, "itemCategoryMappedIds": []};
    const res = await api.post('/pnm_procurement/integration/account/all/vendor', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/integration/account/all/vendor',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-025: [POST] /pnm_procurement/integration/warehouse/v1/get/all/final-success - Integration Warehouse Final Success', async () => {
    const payload = {"pageNumber": null, "pageSize": null, "siteId": "1554"};
    const res = await api.post('/pnm_procurement/integration/warehouse/v1/get/all/final-success', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/integration/warehouse/v1/get/all/final-success',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-026: [POST] /pnm_procurement/integration/tax/v1/get/all/final-success - Integration Tax Final Success', async () => {
    const payload = {"pageNo": 0, "pageSize": 0, "searchField": ""};
    const res = await api.post('/pnm_procurement/integration/tax/v1/get/all/final-success', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/integration/tax/v1/get/all/final-success',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-027: [GET] /pnm_procurement/integration/purchase-order/get/all/freight - Integration Purchase Order Freight', async () => {
    const res = await api.get('/pnm_procurement/integration/purchase-order/get/all/freight');
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/integration/purchase-order/get/all/freight',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-028: [POST] /pnm_procurement/integration/terms-condition/v1/get/all/final-success - Integration Terms Condition Final Success', async () => {
    const payload = {"pageNo": null, "pageSize": null};
    const res = await api.post('/pnm_procurement/integration/terms-condition/v1/get/all/final-success', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/integration/terms-condition/v1/get/all/final-success',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-029: [POST] /pnm_procurement/po/next-action - Po Next Action', async () => {
    const payload = {"siteId": 1554};
    const res = await api.post('/pnm_procurement/po/next-action', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/po/next-action',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-030: [POST] /pnm_procurement/mrn/v1/get/all - Mrn', async () => {
    const payload = {"searchText": "", "categoryId": null, "supplierIds": null, "pageNumber": 1, "pageSize": 15, "engineStateId": null, "siteId": "1554", "fromDate": "2026-10-16T00:00:00", "toDate": "2026-11-16T23:59:59"};
    const res = await api.post('/pnm_procurement/mrn/v1/get/all', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/mrn/v1/get/all',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-031: [POST] /pnm_procurement/mrn/v1/get/all/entity-state-mapping - Mrn Entity State Mapping', async () => {
    const payload = {"entityIds": [358]};
    const res = await api.post('/pnm_procurement/mrn/v1/get/all/entity-state-mapping', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/mrn/v1/get/all/entity-state-mapping',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-032: [POST] /pnm_procurement/po/v1/get/all/final-success - Po Final Success', async () => {
    const payload = {"pageNo": null, "pageSize": null, "siteId": 1554};
    const res = await api.post('/pnm_procurement/po/v1/get/all/final-success', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/po/v1/get/all/final-success',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-033: [POST] /pnm_procurement/mrn/v1/next-action - Mrn Next Action', async () => {
    const payload = {"siteId": "1554", "id": null};
    const res = await api.post('/pnm_procurement/mrn/v1/next-action', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/mrn/v1/next-action',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-034: [POST] /pnm_procurement/purchase-order-dispatch/get/all - Purchase Order Dispatch', async () => {
    const payload = {"engineStateId": null, "pageNo": 1, "pageSize": 25, "searchByPoNumber": "", "searchByItemName": "", "searchByDispatchNumber": "", "fromDate": "2026-10-16", "toDate": "2026-11-16", "openDispatch": null, "siteId": 1554};
    const res = await api.post('/pnm_procurement/purchase-order-dispatch/get/all', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/purchase-order-dispatch/get/all',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-035: [GET] /pnm_procurement/mrnGateEntry/getAllEntityStateMapping - Mrngateentry Getallentitystatemapping', async () => {
    const res = await api.get('/pnm_procurement/mrnGateEntry/getAllEntityStateMapping');
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/mrnGateEntry/getAllEntityStateMapping',
      method: 'GET',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-036: [POST] /pnm_procurement/mrnGateEntry/v1/get/all - Mrngateentry', async () => {
    const payload = {"fromDate": "2026-10-16", "toDate": "2026-11-16", "isActive": true, "pageNo": 1, "pageSize": 25, "searchField": "", "siteId": 1554, "isClosed": null, "categoryFilter": null, "engineStateIds": null};
    const res = await api.post('/pnm_procurement/mrnGateEntry/v1/get/all', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/mrnGateEntry/v1/get/all',
      method: 'POST',
      expectedStatus: 200,
    });
  });

  test('TC-PRC-037: [POST] /pnm_procurement/mrnGateEntry/next-action - Mrngateentry Next Action', async () => {
    const payload = {"siteId": "1554", "id": null};
    const res = await api.post('/pnm_procurement/mrnGateEntry/next-action', payload);
    await validateApiResponse(res, {
      service: 'pnm_procurement',
      endpoint: '/pnm_procurement/mrnGateEntry/next-action',
      method: 'POST',
      expectedStatus: 200,
    });
  });

});
