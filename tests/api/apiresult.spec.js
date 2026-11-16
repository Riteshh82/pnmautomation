const { test, expect } = require('@playwright/test');
const { ApiClient } = require('../../utils/ApiClient');
const SITE_ID = process.env.SITE_ID ?? '102';
const COMPANY_ID = process.env.COMPANY_ID ?? '1';
const SSO_BASE = 'https://nkcssoqa.nyggs.com/backend/sso';
const HRMS_BASE = 'https://nkcssoqa.nyggs.com/backend/hrms/api';
const STORE_BASE = 'https://nkcssoqa.nyggs.com/backend/store/api';
const PNMV2_ROOT = 'https://nkcssoqa.nyggs.com/backend/pnmv2';

const results = [];

function pad(str, len) {
  str = String(str);
  return str.length >= len ? str.slice(0, len) : str + ' '.repeat(len - str.length);
}

async function logResponse(res, label) {
  const status = res.status();
  const body = await res.json().catch(async () => {
    const text = await res.text().catch(() => '<unreadable body>');
    return { __nonJsonBody: text.slice(0, 300) };
  });

  //   const bodyPreview = JSON.stringify(body);
  //   console.log(`[HTTP ${status}] ${label} -> ${bodyPreview.slice(0, 500)}`);
  //   test.info().annotations.push({
  //     type: 'api-response',
  //     description: `${label} | HTTP ${status} | ${bodyPreview.slice(0, 1000)}`,
  //   });

  const tcId = test.info().title.split(':')[0].trim();
  const ok = status >= 200 && status < 300;
  results.push({ tcId, label, status, ok });

  return { status, body };
}

test.describe('@api @smoke — PNM Application: Login & Session Bootstrap', () => {

  test('TC-APP-001: SSO Authenticate', async ({ request }) => {
    const api = new ApiClient(request);
    const res = await api.postAbsolute(`${SSO_BASE}/authenticate`, {
      username: process.env.SSO_USERNAME,
      password: process.env.SSO_PASSWORD,
      companyToken: process.env.SSO_COMPANY_TOKEN,
    });
    await logResponse(res, 'SSO Authenticate');
  });

  test('TC-APP-002: Get All Modules By Company Id', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.getAbsolute(`${SSO_BASE}/api/employee_master/employee/getAllModulesByCompanyId`);
    await logResponse(res, 'Get All Modules By Company Id');
  });

  test('TC-APP-003: User Details By Token', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.getAbsolute(`${PNMV2_ROOT}/user_details_by_token`);
    await logResponse(res, 'User Details By Token');
  });

  test('TC-APP-004: Get Company Config By Company Id', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.getAbsolute(`${HRMS_BASE}/employee/whiteListed/v1/getCompanyConfigByCompanyId?companyId=${COMPANY_ID}`);
    await logResponse(res, 'Get Company Config By Company Id');
  });

  test('TC-APP-005: Get Company', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get(`/pnm_master/company/${COMPANY_ID}`);
    await logResponse(res, 'Get Company');
  });

  test('TC-APP-006: Get User Sites', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_master/site/user_sites');
    await logResponse(res, 'Get User Sites');
  });

  test('TC-APP-007: Get Role Entity Permissions', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/authority/permission/v2/getRoleEntity', {
      siteId: Number(SITE_ID),
      employeeId: 3,
      moduleId: 1,
    });
    await logResponse(res, 'Get Role Entity Permissions');
  });

  test('TC-APP-008: Get App Menu By User', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get(`/pnm_master/app-menu/v1/get/all/byUser/${SITE_ID}`);
    await logResponse(res, 'Get App Menu By User');
  });

  test('TC-APP-009: Get All Roles', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get(`/workflow_engine/roles/all/${COMPANY_ID}`, { 'auth-head': 'd3v3lop3r' });
    await logResponse(res, 'Get All Roles');
  });

});

test.describe('@api — PNM Dashboard', () => {

  test('TC-APP-010: Equipment Dashboard — Get', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_dashboard/equipment-dashboard/v1/get', {
      siteId: Number(SITE_ID),
      card: null,
      timePeriod: 2,
      refresh: false,
      machineType: 1,
    });
    await logResponse(res, 'Equipment Dashboard — Get');
  });

  test('TC-APP-011: Equipment Dashboard — Get Utilization', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const today = new Date().toISOString().split('T')[0];
    const res = await api.post('/pnm_dashboard/equipment-dashboard/v1/get-utilization', {
      siteId: Number(SITE_ID),
      card: null,
      timePeriod: 2,
      refresh: false,
      machineType: 1,
      fromDate: today,
      toDate: today,
    });
    await logResponse(res, 'Equipment Dashboard — Get Utilization');
  });

  test('TC-APP-012: Equipment Dashboard — Machine Performance', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const today = new Date().toISOString().split('T')[0];
    const res = await api.post('/pnm_dashboard/equipment-dashboard/v1/get-machine-perfomance', {
      siteId: Number(SITE_ID),
      card: 'MILAIGE_PERFOMANCE',
      timePeriod: 2,
      refresh: false,
      machineType: 1,
      fromDate: today,
      toDate: today,
    });
    await logResponse(res, 'Equipment Dashboard — Machine Performance');
  });

  test('TC-APP-013: Equipment Dashboard — Vehicle Compliance', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_dashboard/equipment-dashboard/v1/vehicle-compliance', {
      siteId: Number(SITE_ID),
      card: null,
      timePeriod: 2,
      refresh: false,
      machineType: 1,
      filter: 'ALL',
    });
    await logResponse(res, 'Equipment Dashboard — Vehicle Compliance');
  });

});

test.describe('@api — PNM Master Data', () => {

  test('TC-APP-014: Employee List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/employee/v1/employee-list', {
      pageNo: null,
      pageSize: null,
    });
    await logResponse(res, 'Employee List');
  });

  test('TC-APP-015: Unit List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/unit/v1/unit-list', {
      pageNo: 0,
      pageSize: 15,
      searchText: '',
      engineStateId: 3,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Unit List');
  });

  test('TC-APP-016: Fuel Type List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/fuel-type/v2/fuel-type-list', {
      pageNo: 0,
      pageSize: 15,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Fuel Type List');
  });

  test('TC-APP-017: Document Type List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/document-type/v2/document-type-list', {
      pageNo: 0,
      pageSize: 50,
      companyId: COMPANY_ID,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Document Type List');
  });

  test('TC-APP-018: Document Category — All', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/document-type/v1/all/document-category', {
      userDetail: { companyId: Number(COMPANY_ID) },
      siteId: SITE_ID,
    });
    await logResponse(res, 'Document Category — All');
  });

  test('TC-APP-019: Service Type List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/service-type/v2/service-type-list', {
      pageNo: 0,
      pageSize: 15,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Service Type List');
  });

  test('TC-APP-020: Item Master — Final Success List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/restTemplate/v1/getItem/FinalSuccessList', {
      pageNo: 1,
      pageSize: 15,
      equipmentCategoryId: null,
      isUsedForMechanical: true,
      categoryId: null,
      isMixDesign: null,
      isMixDesignConfigNeeded: null,
      isSalePriceNeeded: null,
      isStockNeeded: null,
      isVariantAllowed: null,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Item Master — Final Success List');
  });

  test('TC-APP-021: Service Task List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/service-task/v2/service-task-list', {
      pageNo: 1,
      pageSize: 15,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Service Task List');
  });

  test('TC-APP-022: Equipment Service Schedule List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/equipment-service-schedule/v2/equipment-service-schedule-list', {
      pageNo: 1,
      pageSize: 15,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Equipment Service Schedule List');
  });

  test('TC-APP-023: Owner List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/owner/v2/owner-list', {
      pageNo: 1,
      pageSize: 15,
      statusFilter: null,
      typeId: 5,
      companyId: COMPANY_ID,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Owner List');
  });

  test('TC-APP-024: Workorder List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/workorder/v2/workorder-list', {
      pageNo: 1,
      pageSize: 15,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Workorder List');
  });

  test('TC-APP-026: Account — All (Store Service)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.postAbsolute(`${STORE_BASE}/account/account/all`, {
      pageNo: 1,
      pageSize: 15,
      companyId: COMPANY_ID,
      typeId: 7,
    });
    await logResponse(res, 'Account — All (Store Service)');
  });

  test('TC-APP-027: Equipment Driver — Get List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/equipment-driver/v1/get-list', {
      pageNo: 1,
      pageSize: 15,
      isOwned: null,
      categoryId: null,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Equipment Driver — Get List');
  });

  test('TC-APP-028: Equipment Driver — Category List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/equipment-driver/v1/get-equipment-category-list', {
      designationId: 1388,
      isActive: true,
    });
    await logResponse(res, 'Equipment Driver — Category List');
  });

  test('TC-APP-029: Equipment Driver — Employees With Designation', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/equipment-driver/v1/get-employee-with-designation', {
      designationId: 1388,
      isActive: true,
    });
    await logResponse(res, 'Equipment Driver — Employees With Designation');
  });

  test('TC-APP-030: Chainage List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/chainage/v1/chainage-list', {
      siteId: SITE_ID,
    });
    await logResponse(res, 'Chainage List');
  });

  test('TC-APP-031: Equipment Supervisor — Get List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/equipment-supervisor/v1/get-list', {
      pageNo: 1,
      pageSize: 15,
      searchText: '',
      isOwned: null,
      categoryId: null,
      siteId: SITE_ID,
      userDetail: { companyId: Number(COMPANY_ID) },
    });
    await logResponse(res, 'Equipment Supervisor — Get List');
  });

  test('TC-APP-032: Active Fuel Type List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/fuel-type/v1/active-fuel-type-list', {
      pageNo: null,
      pageSize: null,
    });
    await logResponse(res, 'Active Fuel Type List');
  });

  test('TC-APP-033: Active Unit List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/unit/v1/active-unit-list', {
      pageNo: null,
      pageSize: null,
    });
    await logResponse(res, 'Active Unit List');
  });

  test('TC-APP-034: Account Template', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_master/account/get/accountTemplate');
    await logResponse(res, 'Account Template');
  });

  test('TC-APP-035: Active Document Type List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/document-type/v1/active-document-type-list', {
      pageNo: 0,
      pageSize: 100,
    });
    await logResponse(res, 'Active Document Type List');
  });

  test('TC-APP-036: Employee Supervisor List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/employee/v1/employee-supervisor-list', {
      siteId: SITE_ID,
      isPlant: false,
      userDetail: { companyId: Number(COMPANY_ID) },
    });
    await logResponse(res, 'Employee Supervisor List');
  });

});

test.describe('@api — PNM Plant & Equipment', () => {

  test('TC-APP-037: Plant Type List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/plant/v1/plant-type', { isActive: true });
    await logResponse(res, 'Plant Type List');
  });

  test('TC-APP-038: Equipment Category List (clone)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/equipment-catagory/v1/equipment-category-list-clone', {
      machineType: 0,
      pageNo: 1,
      pageSize: 15,
      siteId: SITE_ID,
      type: 1,
      isActive: null,
    });
    await logResponse(res, 'Equipment Category List (clone)');
  });

  test('TC-APP-039: Equipment Category Info', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_asset/equipment-catagory/v1/equipment-category-info/382');
    await logResponse(res, 'Equipment Category Info');
  });

  test('TC-APP-040: Priority — Get List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/priority/v1/get-list', {
      machineType: 0,
      pageNo: 1,
      pageSize: 15,
      userId: 3,
      userCompanyId: Number(COMPANY_ID),
      userRoleId: 3,
      siteId: SITE_ID,
      type: 1,
    });
    await logResponse(res, 'Priority — Get List');
  });

  test('TC-APP-041: Manufacturer List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/manufacture/v1/manufacturer-list', {
      pageNo: 1,
      pageSize: 15,
      pageType: 1,
      type: 1,
      userDetail: { companyId: Number(COMPANY_ID) },
      siteId: SITE_ID,
    });
    await logResponse(res, 'Manufacturer List');
  });

  test('TC-APP-042: Equipment Model List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/equipment-model/v2/equipment-model-list', {
      pageNo: 1,
      pageSize: 15,
      searchText: '',
      isActive: null,
      type: 1,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Equipment Model List');
  });

  test('TC-APP-043: Active Manufacturer List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/manufacture/v1/active-manufacturer-list', {
      pageNo: 0,
      pageSize: 0,
      type: 1,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Active Manufacturer List');
  });

  test('TC-APP-044: Equipment By Category Id', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/equipment/v1/equipment-by-category-id', {
      categoryId: null,
      siteId: SITE_ID,
      isOwned: null,
      isActive: true,
      type: 1,
      hideScrapAndScrapSold: false,
      isPlant: false,
      equipmentState: null,
      equipmentSortColumn: null,
      listEquipmentDocument: false,
      isContractorHire: null,
    });
    await logResponse(res, 'Equipment By Category Id');
  });

  test('TC-APP-045: Equipment State (Hired/Owned)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/equipment/v2/get/equipment-state/hired/owned', {
      isOwned: true,
    });
    await logResponse(res, 'Equipment State (Hired/Owned)');
  });

  test('TC-APP-046: Equipment Info', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_asset/equipment/v1/equipment-info/4087');
    await logResponse(res, 'Equipment Info');
  });

  test('TC-APP-047: Equipment MRN Bill File', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_asset/equipment/v1/mrn-bill-file/4087');
    await logResponse(res, 'Equipment MRN Bill File');
  });

  test('TC-APP-048: Sub Plant — Get All', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/sub_plant/get/all', {
      pageNo: 0,
      pageSize: 50,
      searchText: '',
      companyId: COMPANY_ID,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Sub Plant — Get All');
  });

  test('TC-APP-049: Equipment List By Category Id', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/equipment/v1/equipment-list-category-id', {
      siteId: SITE_ID,
      searchText: '',
    });
    await logResponse(res, 'Equipment List By Category Id');
  });

  test('TC-APP-050: Active Equipment Model List By Manufacturer Id', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/equipment-model/v1/active-equipment-model-list-by-manufactureId', {
      id: 3174,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Active Equipment Model List By Manufacturer Id');
  });

});

test.describe('@api — PNM Other Assets', () => {

  test('TC-APP-051: Other Asset — Category List (clone)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/other-asset/v1/category-list-clone', {
      machineType: 0,
      pageNo: 1,
      pageSize: 15,
      siteId: SITE_ID,
      type: 1,
      isActive: null,
    });
    await logResponse(res, 'Other Asset — Category List (clone)');
  });

  test('TC-APP-052: Other Asset — Category Info', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_asset/other-asset/v1/category-info/377');
    await logResponse(res, 'Other Asset — Category Info');
  });

  test('TC-APP-053: Other Asset — Manufacturer List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/other-asset/v1/manufacturer-list', {
      pageNo: 1,
      pageSize: 15,
      pageType: 1,
      type: 2,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Other Asset — Manufacturer List');
  });

  test('TC-APP-054: Other Asset — Model List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/other-asset/v2/model-list', {
      pageNo: 1,
      pageSize: 15,
      isActive: null,
      searchText: '',
      type: 2,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Other Asset — Model List');
  });

  test('TC-APP-055: Other Asset — Active Manufacturer List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/other-asset/v1/active-manufacturer-list', {
      pageNo: 0,
      pageSize: 0,
      type: 2,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Other Asset — Active Manufacturer List');
  });

  test('TC-APP-056: Other Asset — Active Category List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/other-asset/v1/active-category-list-others', {
      siteId: SITE_ID,
      type: 2,
      isActive: true,
    });
    await logResponse(res, 'Other Asset — Active Category List');
  });

  test('TC-APP-057: Other Asset — By Category Id', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_asset/other-asset/v1/by-category-id', {
      categoryId: null,
      siteId: Number(SITE_ID),
      equipmentState: null,
      isOwned: null,
      isActive: true,
      type: 2,
      hideScrapAndScrapSold: false,
      isPlant: false,
      equipmentSortColumn: '',
      listEquipmentDocument: false,
    });
    await logResponse(res, 'Other Asset — By Category Id');
  });

  test('TC-APP-058: Other Asset — Info', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_asset/other-asset/v1/info/7976');
    await logResponse(res, 'Other Asset — Info');
  });

  test('TC-APP-059: Active Owner List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/owner/v1/active-owner-list', {
      statusFilter: true,
      typeId: 5,
      companyId: COMPANY_ID,
      isForWorkOrderPage: false,
    });
    await logResponse(res, 'Active Owner List');
  });

});

test.describe('@api — PNM Procurement: Requisition / Asset Allocation', () => {

  test('TC-APP-060: Requisition — Get All', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/requisition/get/all', {
      pageNumber: 1,
      pageSize: 15,
      siteId: SITE_ID,
      engineStateId: null,
      categoryId: null,
      supplierId: null,
      fromDate: '2026-05-19',
      toDate: '2026-06-19',
    });
    await logResponse(res, 'Requisition — Get All');
  });

  test('TC-APP-061: Item Type — Get All', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_procurement/item-type/getAll');
    await logResponse(res, 'Item Type — Get All');
  });

  test('TC-APP-062: Requisition — Next Action', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/requisition/next-action', {
      id: null,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Requisition — Next Action');
  });

  test('TC-APP-063: Equipment Category — Get HSN Code (ACE)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_procurement/equipment-category/get-hsn-code/382');
    await logResponse(res, 'Equipment Category — Get HSN Code (ACE)');
  });

  test('TC-APP-064: Equipment Category — Get HSN Code (GST Category)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_procurement/equipment-category/get-hsn-code/381');
    await logResponse(res, 'Equipment Category — Get HSN Code (GST Category)');
  });

  test('TC-APP-065: Asset Allocation — Get All', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/asset-allocation/get/all', {
      pageNumber: 1,
      pageSize: 15,
      siteId: SITE_ID,
      fromDate: '2026-05-19',
      toDate: '2026-06-19',
    });
    await logResponse(res, 'Asset Allocation — Get All');
  });

  test('TC-APP-066: Integration — Get All Applicable Issue-To Type', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_procurement/integration/getAllApplicableIssueToType');
    await logResponse(res, 'Integration — Get All Applicable Issue-To Type');
  });

  test('TC-APP-067: Integration — Issue Slip Nature', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_procurement/integration/issue_slip/get/nature');
    await logResponse(res, 'Integration — Issue Slip Nature');
  });

  test('TC-APP-068: Asset Allocation — Next Action', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/asset-allocation/next-action', {
      id: null,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Asset Allocation — Next Action');
  });

  test('TC-APP-069: Integration — Issue-To List By Company Id', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/integration/get/issueToListByCompanyId', {
      siteId: SITE_ID,
      isActive: true,
      statusFilter: true,
      getFromWorkOrderMapping: true,
      pageNo: 1,
      pageSize: 100,
      searchField: '',
      applicableIssueToTypeId: 1,
    });
    await logResponse(res, 'Integration — Issue-To List By Company Id');
  });

  test('TC-APP-070: Integration — Get All Chainage', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/integration/getAllChainage', {
      siteId: SITE_ID,
      isActive: true,
      pageNo: null,
      pageSize: null,
      searchField: '',
    });
    await logResponse(res, 'Integration — Get All Chainage');
  });

});

test.describe('@api — PNM Procurement: Indent / Purchase Order', () => {

  test('TC-APP-071: Indent — Entity State Mapping', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_procurement/indent/get/all/entity-state-mapping');
    await logResponse(res, 'Indent — Entity State Mapping');
  });

  test('TC-APP-072: Indent — Get All', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/indent/get/all', {
      engineStateId: null,
      searchText: '',
      categoryId: null,
      supplierId: null,
      openState: '',
      pageNo: 1,
      pageSize: 10,
      siteId: SITE_ID,
      fromDate: '2026-05-19T00:00:00',
      toDate: '2026-06-19T23:59:59',
    });
    await logResponse(res, 'Indent — Get All');
  });

  test('TC-APP-073: Indent — Next Action', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/indent/next-action', {
      id: null,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Indent — Next Action');
  });

  test('TC-APP-074: Indent — Latest PO Date & Rate', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/indent/latest-po-date-rate', { id: 381 });
    await logResponse(res, 'Indent — Latest PO Date & Rate');
  });

  test('TC-APP-075: Purchase Order — Get All', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/po/get/all', {
      engineStateId: null,
      searchText: '',
      categoryId: null,
      supplierId: null,
      openState: 1,
      pageNo: 1,
      pageSize: 15,
      siteId: SITE_ID,
      fromDate: '2026-05-19T00:00:00',
      toDate: '2026-06-19T23:59:59',
    });
    await logResponse(res, 'Purchase Order — Get All');
  });

  test('TC-APP-076: Purchase Order — Entity State Mapping', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/po/get/all/entity-state-mapping', {
      entityIds: [357],
    });
    await logResponse(res, 'Purchase Order — Entity State Mapping');
  });

  test('TC-APP-077: Gatepass — Get Site Address', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_service_dpr/gatepass/v1/get-site-address', {
      pageNo: null,
      pageSize: null,
    });
    await logResponse(res, 'Gatepass — Get Site Address');
  });

  test('TC-APP-078: Integration — Vendor Accounts', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/integration/account/all/vendor', {
      companyId: COMPANY_ID,
      pageNo: 1,
      pageSize: 500,
      typeId: null,
      itemCategoryMappedIds: [],
    });
    await logResponse(res, 'Integration — Vendor Accounts');
  });

  test('TC-APP-079: Integration — Warehouses (Final Success)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/integration/warehouse/v1/get/all/final-success', {
      pageNumber: null,
      pageSize: null,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Integration — Warehouses (Final Success)');
  });

  test('TC-APP-080: Integration — Tax Types (Final Success)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/integration/tax/v1/get/all/final-success', {
      pageNo: 0,
      pageSize: 0,
      searchField: '',
    });
    await logResponse(res, 'Integration — Tax Types (Final Success)');
  });

  test('TC-APP-081: Integration — PO Freight Types', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_procurement/integration/purchase-order/get/all/freight');
    await logResponse(res, 'Integration — PO Freight Types');
  });

  test('TC-APP-082: Integration — Terms & Conditions (Final Success)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/integration/terms-condition/v1/get/all/final-success', {
      pageNo: null,
      pageSize: null,
    });
    await logResponse(res, 'Integration — Terms & Conditions (Final Success)');
  });

  test('TC-APP-083: Purchase Order — Next Action', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/po/next-action', { siteId: Number(SITE_ID) });
    await logResponse(res, 'Purchase Order — Next Action');
  });

  test('TC-APP-084: Integration — Get Warehouse By Id', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_procurement/integration/get/warehouse/14');
    await logResponse(res, 'Integration — Get Warehouse By Id');
  });

  test('TC-APP-085: Integration — Get Terms & Condition By Id', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_procurement/integration/get/terms-condition/1');
    await logResponse(res, 'Integration — Get Terms & Condition By Id');
  });

  test('TC-APP-086: MRN — Get All', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/mrn/v1/get/all', {
      searchText: '',
      categoryId: null,
      supplierIds: null,
      pageNumber: 1,
      pageSize: 15,
      engineStateId: null,
      siteId: SITE_ID,
      fromDate: '2026-05-19T00:00:00',
      toDate: '2026-06-19T23:59:59',
    });
    await logResponse(res, 'MRN — Get All');
  });

  test('TC-APP-087: MRN — Entity State Mapping', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/mrn/v1/get/all/entity-state-mapping', {
      entityIds: [358],
    });
    await logResponse(res, 'MRN — Entity State Mapping');
  });

  test('TC-APP-088: Integration — Get All Transporters', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/integration/get/all-transporter', {
      companyId: COMPANY_ID,
      pageNo: 0,
      pageSize: 0,
      typeId: null,
      isActive: true,
      itemCategoryMappedIds: [],
    });
    await logResponse(res, 'Integration — Get All Transporters');
  });

  test('TC-APP-089: Purchase Order — Final Success List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/po/v1/get/all/final-success', {
      pageNo: null,
      pageSize: null,
      siteId: Number(SITE_ID),
    });
    await logResponse(res, 'Purchase Order — Final Success List');
  });

  test('TC-APP-090: MRN — Next Action', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/mrn/v1/next-action', {
      siteId: SITE_ID,
      id: null,
    });
    await logResponse(res, 'MRN — Next Action');
  });

  test('TC-APP-091: Purchase Order — Get Info', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/po/get/info', {
      id: 553,
      isForMrn: true,
    });
    await logResponse(res, 'Purchase Order — Get Info');
  });

  test('TC-APP-092: Account Payable — Advance Payments', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/account-payable-account-type/get-all-advance-payment', {
      companyId: null,
      siteId: SITE_ID,
      fromDate: '2026-05-19T13:46',
      toDate: '2026-06-19T13:46',
      pageNo: 0,
      paymentNo: '',
      supplierId: '',
      engineStateId: '',
      poNo: '',
      pageSize: 15,
    });
    await logResponse(res, 'Account Payable — Advance Payments');
  });

  test('TC-APP-093: Account Payable — Next Action', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/account-payable-account-type/next-action', {
      id: null,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Account Payable — Next Action');
  });

  test('TC-APP-094: Purchase Order Dispatch — Get All', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_procurement/purchase-order-dispatch/get/all', {
      engineStateId: null,
      pageNo: 1,
      pageSize: 25,
      searchByPoNumber: '',
      searchByItemName: '',
      searchByDispatchNumber: '',
      fromDate: '2026-05-19',
      toDate: '2026-06-19',
      openDispatch: null,
      siteId: Number(SITE_ID),
    });
    await logResponse(res, 'Purchase Order Dispatch — Get All');
  });

});

test.describe('@api — PNM Service / DPR', () => {

  test('TC-APP-095: Plan For Service — Equipment List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_service_dpr/plan-for-service/v2/equipment-list-service', {
      pageNo: 1,
      pageSize: 15,
      siteId: SITE_ID,
      machineType: 1,
    });
    await logResponse(res, 'Plan For Service — Equipment List');
  });

  test('TC-APP-096: Active Service Type List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_service_dpr/service-type/v1/active-service-type-list');
    await logResponse(res, 'Active Service Type List');
  });

  test('TC-APP-097: Active Service Task List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_service_dpr/service-task/v1/active-service-task-list');
    await logResponse(res, 'Active Service Task List');
  });

  test('TC-APP-098: Equipment Service Info', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_service_dpr/service/v1/equipment-service-info', { id: 8931 });
    await logResponse(res, 'Equipment Service Info');
  });

  test('TC-APP-099: Hybrid — Service Schedule List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_service_dpr/hybrid/v1/get/all/service-schedule-list', {
      pageNo: 1,
      pageSize: 15,
      siteId: SITE_ID,
      machineTypeId: 1,
      isPlant: false,
    });
    await logResponse(res, 'Hybrid — Service Schedule List');
  });

  test('TC-APP-100: Service — Get All Service Type', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_service_dpr/service/v1/get/all/service-type');
    await logResponse(res, 'Service — Get All Service Type');
  });

  test('TC-APP-101: Service Provider List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_service_dpr/service-provider/v1/service-provider-list');
    await logResponse(res, 'Service Provider List');
  });

  test('TC-APP-102: Tax Type List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/pnm_service_dpr/tax-type/v1/tax-type');
    await logResponse(res, 'Tax Type List');
  });

  test('TC-APP-103: Hybrid — Service Info (v2)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_service_dpr/hybrid/v2/service-info', { id: 34163 });
    await logResponse(res, 'Hybrid — Service Info (v2)');
  });

  test('TC-APP-104: Plan For Service — Mobile Scheduled List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_service_dpr/plan-for-service/v1/mobile-scheduled-service-list', {
      pageNo: 1,
      pageSize: 15,
      searchText: '',
      siteId: SITE_ID,
      equipState: null,
      isPlant: false,
      isCompleted: true,
      fromDate: null,
      toDate: null,
      machineTypeId: 1,
    });
    await logResponse(res, 'Plan For Service — Mobile Scheduled List');
  });

  test('TC-APP-105: Gatepass — List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_service_dpr/gatepass/v1/gatepass-list', {
      pageNo: 1,
      pageSize: 15,
      siteId: SITE_ID,
      machineType: 'Equipment',
    });
    await logResponse(res, 'Gatepass — List');
  });

  test('TC-APP-106: DPR — Get All', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const today = new Date().toISOString().split('T')[0];
    const res = await api.post('/pnm_service_dpr/dpr/v1/get-all', {
      siteId: SITE_ID,
      isOwned: null,
      fromDate: today,
      shiftId: null,
      machineType: 'Equipment',
      categoryId: null,
      pageNo: 1,
      pageSize: 10,
      searchText: null,
    });
    await logResponse(res, 'DPR — Get All');
  });

  test('TC-APP-107: Workflow Engine — Entity State (465/1)', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.get('/workflow_engine/entity_state/v1/all/465/1', { 'auth-head': 'd3v3lop3r' });
    await logResponse(res, 'Workflow Engine — Entity State (465/1)');
  });

});

/**
 * Rental Service endpoints. Previously some of these returned HTTP 500 in
 * the recorded HAR capture. They're kept in their own describe block for
 * organization, but — like every other test in this file — they only log
 * whatever status/body comes back. Nothing here fails the suite.
 */
test.describe('@api — PNM Rental Service', () => {

  test('TC-APP-025: External Engineer — Get All', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/pnm_master/engineer/v2/get-all-external-engineer', {
      pageNo: 1,
      pageSize: 15,
      siteId: SITE_ID,
    });
    await logResponse(res, 'External Engineer — Get All');
  });

  test('TC-APP-108: Workorder — Service Type Dropdown', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/rentalservice/workorder/service_type_workorders_drop_down', {
      companyId: COMPANY_ID,
      siteId: SITE_ID,
      equipmentId: 5856,
    });
    await logResponse(res, 'Workorder — Service Type Dropdown');
  });

  test('TC-APP-109: Workorder — List', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/rentalservice/workorder/workorders', {
      companyId: COMPANY_ID,
      siteId: SITE_ID,
      userId: '3',
      isActive: true,
      pageNo: 1,
      pageSize: 10,
      woTypeId: null,
      searchField: '',
    });
    await logResponse(res, 'Workorder — List');
  });

  test('TC-APP-110: Client Invoice — Get All', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/rentalservice/client-invoice/v1/get/all', {
      pageNo: 1,
      pageSize: 10,
      stateId: null,
      search: '',
      siteId: Number(SITE_ID),
      sortByInvoiceDateInAsc: false,
    });
    await logResponse(res, 'Client Invoice — Get All');
  });

  test('TC-APP-111: Workorder — Final Workorders', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/rentalservice/workorder/v1/final/workorders', {
      amendWo: true,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Workorder — Final Workorders');
  });

  test('TC-APP-112: Invoke Amendment — Next Action', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/rentalservice/invoke_amendment/v1/next-action', {
      id: null,
      siteId: SITE_ID,
    });
    await logResponse(res, 'Invoke Amendment — Next Action');
  });

  test('TC-APP-113: Invoke Amendment — Get', async ({ request }) => {
    const api = new ApiClient(request);
    await api.login();
    const res = await api.post('/rentalservice/invoke_amendment/v1/get', {
      siteId: SITE_ID,
      pageNo: 1,
      pageSize: 10,
    });
    await logResponse(res, 'Invoke Amendment — Get');
  });

});

test.afterAll(() => {
  const sorted = [...results].sort(
    (a, b) => parseInt(a.tcId.replace(/\D/g, ''), 10) - parseInt(b.tcId.replace(/\D/g, ''), 10)
  );
  const working = sorted.filter((r) => r.ok);
  const failing = sorted.filter((r) => !r.ok);

  console.log('\n================= API RESULTS SUMMARY =================\n');
  console.log(pad('TC ID', 12) + pad('Endpoint', 42) + pad('Status', 8) + 'Result');
  console.log('-'.repeat(80));

  for (const r of sorted) {
    const icon = r.ok ? '✅ Working' : '❌ Failing';
    console.log(pad(r.tcId, 12) + pad(r.label, 42) + pad(r.status, 8) + icon);
  }

  console.log('-'.repeat(80));
  console.log(`  Total Endpoints : ${sorted.length}`);
  console.log(`  Working (2xx)   : ${working.length}`);
  console.log(`  Failing         : ${failing.length}`);

  if (failing.length) {
    console.log('\n  Failing endpoints:');
    failing.forEach((r) => console.log(`    ${r.tcId}  ${r.label}  -> ${r.status}`));
  }

  console.log('\n=========================================================\n');
});
