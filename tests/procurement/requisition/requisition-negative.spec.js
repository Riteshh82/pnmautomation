const { test, expect } = require('../../../fixtures/base.fixture');
const { RequisitionPage } = require('../../../pages/RequisitionPage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Requisition Procurement — Negative Scenarios
 *
 * Tags:
 *   @negative     — negative flow filter
 *   @requisition  — scope filter
 */

test.describe('Requisition Procurement — Negative Scenarios', () => {

  test('@negative TC-REQ-NEG-01: Submitting empty Requisition form is prevented', async ({ PnMPage: page }) => {
    const requisition = new RequisitionPage(page);
    const navbar = new NavbarPage(page);

    await navbar.goToRequisition();
    await requisition.openAddForm();

    // Click Create button without adding any row data
    await requisition.createButton.click();

    // Verify success message does not appear
    await expect(requisition.successMessage).not.toBeVisible({ timeout: 3_000 });
  });

});
