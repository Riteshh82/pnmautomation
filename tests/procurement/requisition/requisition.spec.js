const { test, expect } = require('../../../fixtures/base.fixture');
const { RequisitionPage } = require('../../../pages/RequisitionPage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Requisition Procurement — End-to-End Tests
 *
 * Tags:
 *   @smoke        — critical happy path
 *   @positive     — happy-path scenarios
 *   @requisition  — scope filter for this module
 */

test.describe('Requisition Procurement', () => {

  test('@smoke @positive TC-REQ-01: Create requisition with Equipment and Plant rows',
    async ({ PnMPage: page }) => {
      const requisition = new RequisitionPage(page);
      const navbar = new NavbarPage(page);
      await navbar.goToRequisition();
      await requisition.openAddForm();

      /** @type {import('../../../pages/RequisitionPage').RequisitionRow[]} */
      const rows = [
        {
          machineType:         'Equipment',
          category:           'JCB hydraulic',
          manufacturer:       'tata sta',
          manufacturerOption: 'TATA STAR',
          model:              '+1S -LP712/42 BSIII',
          quantity:           '2',
          remarks:            'making equipment category',
        },
      ];

      await requisition.addRows(rows);
      await requisition.uploadDocument('assets/upload.png');
      await requisition.submit();
  });

});

