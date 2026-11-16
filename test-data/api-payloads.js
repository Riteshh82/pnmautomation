const SITE_ID    = process.env.SITE_ID    ?? '102';
const COMPANY_ID = process.env.COMPANY_ID ?? '1';

const ENDPOINTS = {

  FUEL_TYPE_LIST: '/pnm_master/fuel-type/v2/fuel-type-list',
  SERVICE_TYPE_LIST: '/pnm_master/service-type/v2/service-type-list',
  DOCUMENT_TYPE_LIST: '/pnm_master/document-type/v2/document-type-list',

  TASK_LIST: '/pnm_master/task/v2/task-list',

  SUBPLANT_LIST: '/pnm_master/sub-plant/v2/sub-plant-list',

  EXT_ENGINEER_LIST: '/pnm_master/external-service-engineer/v2/external-service-engineer-list',

  MANUFACTURER_LIST: '/pnm_master/manufacturer/v2/manufacturer-list',

  MODEL_LIST: '/pnm_master/model/v2/model-list',

  REQUISITION_LIST: '/pnm_procurement/requisition/v2/requisition-list',

  INDENT_LIST: '/pnm_procurement/indent/v2/indent-list',

  PURCHASE_ORDER_LIST: '/pnm_procurement/purchase-order/v2/purchase-order-list',

  OWNER_LIST: '/pnm_master/owner/v2/owner-list',

};

const PAYLOADS = {

  FUEL_TYPE: {
    LIST: { pageNo: 1, pageSize: 15, siteId: SITE_ID, companyId: COMPANY_ID },
    SAVE: { name: 'Diesel', isActive: true, siteId: SITE_ID, companyId: COMPANY_ID },
  },

  SERVICE_TYPE: {
    LIST: { pageNo: 1, pageSize: 15, siteId: SITE_ID, companyId: COMPANY_ID },
    SAVE: { name: 'Preventive', isActive: true, siteId: SITE_ID, companyId: COMPANY_ID },
  },

  DOCUMENT_TYPE: {
    LIST: { pageNo: 1, pageSize: 15, siteId: SITE_ID, companyId: COMPANY_ID },
    SAVE: { name: 'Insurance', notificationDays: 30, isActive: true, isFinance: false, siteId: SITE_ID, companyId: COMPANY_ID },
  },

  TASK: {
    LIST: { pageNo: 1, pageSize: 15, siteId: SITE_ID, companyId: COMPANY_ID },
    SAVE: { name: 'Oill Change', isActive: true, siteId: SITE_ID, companyId: COMPANY_ID },
  },

  SUBPLANT: {
    LIST: { pageNo: 1, pageSize: 15, siteId: SITE_ID, companyId: COMPANY_ID },
    SAVE: { name: 'mobil diesel oill', description: 'this is a description', plantCategory: 'test 17 sept', isActive: true, siteId: SITE_ID, companyId: COMPANY_ID },
  },

  EXT_ENGINEER: {
    LIST: { pageNo: 1, pageSize: 15, siteId: SITE_ID, companyId: COMPANY_ID },
    SAVE: {
      companyId:     COMPANY_ID,
      personName:    'Aditya Awasthi',
      contactNo:     '9876543212',
      address:       'udyog vihar',
      rate:          1000,
      unitOfRate:    'Hours',
      isActive:      true,
      siteId:        SITE_ID,
    },
  },

  MANUFACTURER: {
    LIST: { pageNo: 1, pageSize: 15, siteId: SITE_ID, companyId: COMPANY_ID },
    SAVE: { name: 'TATA  1', isActive: true, siteId: SITE_ID, companyId: COMPANY_ID },
  },

  MODEL: {
    LIST: { pageNo: 1, pageSize: 15, siteId: SITE_ID, companyId: COMPANY_ID },
    SAVE: { name: '+2S -LP712/42 BSIII', manufacturer: 'TATA STAR', isActive: true, siteId: SITE_ID, companyId: COMPANY_ID },
  },

  REQUISITION: {
    LIST: { pageNo: 1, pageSize: 15, siteId: SITE_ID, companyId: COMPANY_ID },
  },

  INDENT: {
    LIST: { pageNo: 1, pageSize: 15, siteId: SITE_ID, companyId: COMPANY_ID },
  },

  PURCHASE_ORDER: {
    LIST: { pageNo: 1, pageSize: 15, siteId: SITE_ID, companyId: COMPANY_ID },
  },

  OWNER: {
    LIST: { pageNo: 1, pageSize: 15, statusFilter: null, typeId: 5, companyId: COMPANY_ID, siteId: SITE_ID },
  },

};

module.exports = { ENDPOINTS, PAYLOADS };
