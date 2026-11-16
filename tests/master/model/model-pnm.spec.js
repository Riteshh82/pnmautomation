const { test, expect } = require('../../../fixtures/base.fixture');
const { ModelPNMPage } = require('../../../pages/ModelPNMPage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Model PNM — End-to-End Tests
 *
 * Pre-condition: the `storePage` fixture handles login + site selection,
 * so every test here starts already inside the P&M Master site dashboard.
 *
 * Tags:
 *   @smoke      — critical happy path
 *   @positive   — happy-path scenarios
 *   @model-pnm  — scope filter for this module
 */

test.describe('Model PNM', () => {

  test('@smoke @positive TC-MP-01: Model PNM menu item opens the list', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const modelPNM = new ModelPNMPage(page);
    await navbar.goToModelPNM();
    await modelPNM.openAddForm();
    await modelPNM.fillAndSubmit('Test Model', 'mobil diesel oill', 'TM-001', '10000', false);
    await modelPNM.expectSuccess();
  });

});
