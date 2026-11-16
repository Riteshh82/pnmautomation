// const { test, expect } = require('@playwright/test');
// const { ApiClient } = require('../../utils/ApiClient');

// test.describe('@api @positive — PNM Module API Verification', () => {

//   test('TC-API-FT-01: Fuel Type list', async ({ request }) => {
//     const api = new ApiClient(request);
//     await api.login();

//     const res = await api.post(
//       '/pnm_master/fuel-type/v2/fuel-type-list',
//       {}
//     );

//     expect(res.status()).toBe(200);
//   });

//   test('TC-API-ST-01: Service Type list', async ({ request }) => {
//     const api = new ApiClient(request);
//     await api.login();

//     const res = await api.post(
//       '/pnm_master/service-type/v2/service-type-list',
//       {}
//     );

//     expect(res.status()).toBe(200);
//   });

//   test('TC-API-DT-01: Document Type list', async ({ request }) => {
//     const api = new ApiClient(request);
//     await api.login();

//     const res = await api.post(
//       '/pnm_master/document-type/v2/document-type-list',
//       {}
//     );

//     expect(res.status()).toBe(200);
//   });

//   test('TC-API-OWN-01: Owner list', async ({ request }) => {
//     const api = new ApiClient(request);
//     await api.login();

//     const res = await api.post(
//       '/pnm_master/owner/v2/owner-list',
//       {}
//     );

//     expect(res.status()).toBe(200);
//   });

//   test('TC-API-TASK-01: Add Service Task', async ({ request }) => {
//     const api = new ApiClient(request);
//     await api.login();

//     const res = await api.post(
//       '/pnm_master/service-task/v1/add-update-service-task',
//       {
//         id: 0,
//         actionMsg: "",
//         name: "Automation Task",
//         isActive: true,
//         siteId: "102"
//       }
//     );

//     expect(res.status()).toBe(200);
//   });

//   test('TC-API-SP-01: Add Subplant', async ({ request }) => {
//     const api = new ApiClient(request);
//     await api.login();

//     const res = await api.post(
//       '/pnm_asset/sub_plant/v1/add-update',
//       {
//         subPlantName: `Auto_${Date.now()}`,
//         description: 'QA Test',
//         categoryId: 1,
//         siteId: 102
//       }
//     );

//     expect(res.status()).toBe(200);
//   });

//   test('TC-API-MFG-01: Add Manufacturer', async ({ request }) => {
//     const api = new ApiClient(request);
//     await api.login();

//     const res = await api.post(
//       '/pnm_asset/manufacture/v1/add-update-manufacturer',
//       {
//         id: 0,
//         name: `Auto_MFG_${Date.now()}`,
//         isActive: true,
//         type: { id: 1 },
//         isDeleted: false,
//         siteId: "102"
//       }
//     );

//     console.log(await res.json());
//     expect(res.status()).toBe(200);
//   });

//   test('TC-API-MDL-01: Add Model', async ({ request }) => {
//     const api = new ApiClient(request);
//     await api.login();

//     const res = await api.post(
//       '/pnm_asset/equipment-model/v1/add-update-equipment-model',
//       {
//         id: 0,
//         name: `Auto_Model_${Date.now()}`,
//         isActive: true,
//         expectedMileage: 10000,
//         manufactureDTO: { id: 3171 }, // existing manufacturer ID
//         type: { id: "1" },
//         ecode: `TM-${Date.now()}`
//       }
//     );

//     console.log(await res.json());
//     expect(res.status()).toBe(200);
//   });

//   test('TC-API-ESE-01: Add External Service Engineer', async ({ request }) => {
//     const api = new ApiClient(request);
//     await api.login();

//     const res = await api.post(
//       '/pnm_master/engineer/v1/add-update-external-engineer',
//       {
//         id: 0,
//         accountServProviderId: 31376,
//         companyName: `Auto_Company_${Date.now()}`,
//         companyAddress: "Gurgaon Test Address",
//         name: `Auto_Engineer_${Date.now()}`,
//         contactDetails: "9876543212",
//         enggLocalAddress: "Udyog Vihar",
//         rate: 1000,
//         unit: { id: 29 },
//         siteId: "102",
//         isActive: true
//       }
//     );

//     const body = await res.json();
//     console.log(body);

//     expect(res.status()).toBe(200);
//   });

//   test('TC-API-REQ-01: Add Requisition', async ({ request }) => {
//     const api = new ApiClient(request);
//     await api.login();

//     const res = await api.post(
//       '/pnm_procurement/requisition/add-update',
//       {
//         id: 0,
//         engineStateId: 22,
//         stateTransitionRemark: "",
//         siteId: "102",
//         requisitionDate: "2026-04-13",

//         requisitionItems: [
//           {
//             id: 0,
//             machineType: 1,
//             equipmentCategoryId: 376,
//             manufactureId: 37,
//             modelId: 36,
//             subPlantId: null,
//             subPlantDescription: "",
//             requestedQuantity: 2,
//             remarks: "Automation Test",
//             isForceClosed: null,
//             forceColesedOn: null,
//             forceClosedReason: null,
//             isActive: true
//           }
//         ],

//         requisitionFiles: [
//           {
//             id: 0,
//             requisitionFileId: 6165741,
//             indentFileSize: null,
//             isActive: true
//           }
//         ]
//       }
//     );

//     const body = await res.json();
//     console.log(body);

//     expect(res.status()).toBe(200);
//   });

//   test('TC-API-IND-01: Add Indent', async ({ request }) => {
//     const api = new ApiClient(request);
//     await api.login();

//     const res = await api.post(
//       '/pnm_procurement/indent/add-update',
//       {
//         id: 0,
//         engineStateId: 22,
//         requisitionId: null,
//         stateTransitionRemark: null,
//         siteId: "102",
//         expiryDate: null,

//         indentItems: [
//           {
//             id: 0,
//             requisitionNo: null,
//             requisitionId: null,
//             equipmentCategoryId: 374,
//             pnmManufacturerId: 3168,
//             pnmModelId: 619,
//             requestedQuantity: 1,
//             approvedQuantity: 1,
//             previousPurchaseRate: null,
//             previousPurchaseDate: null,
//             remarks: "Automation Test",
//             subPlantId: null,
//             subPlantDescription: null,
//             machineType: 1,
//             typeId: 1,
//             isForceClosed: null,
//             forceColesedOn: null,
//             forceClosedReason: null,
//             isActive: true
//           }
//         ],

//         indentFiles: [
//           {
//             id: 0,
//             indentFileId: 6165054,
//             indentFileSize: null,
//             isActive: true
//           }
//         ]
//       }
//     );

//     const body = await res.json();
//     console.log(body);

//     expect(res.status()).toBe(200);
//   });

//   test('TC-API-PO-01: Purchase Order list', async ({ request }) => {
//     test.skip(true, 'Endpoint not identified from backend');
//   });

// });
