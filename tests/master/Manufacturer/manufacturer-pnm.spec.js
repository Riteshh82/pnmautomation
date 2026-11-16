const { test, expect } = require('../../../fixtures/base.fixture');
const { ManufacturerPNMPage } = require('../../../pages/ManufacturerPNMPage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Manufacturer Master — End-to-End Tests
 *
 * Pre-condition: the `storePage` fixture handles login + site selection,
 * so every test here starts already inside the P&M Master site dashboard.
 *
 * Tags:
 *   @smoke      — critical happy path
 *   @positive   — happy-path scenarios
 *   @manufacturer  — scope filter for this module
 */

test.describe('Manufacturer Master', () => {

  test('@smoke @positive TC-MF-01: Manufacturer menu item opens the list', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const manufacturer = new ManufacturerPNMPage(page);
    await navbar.goToManufacturerPNM();
    await manufacturer.openAddForm();
    await manufacturer.fillAndSubmit('mobil diesel oilll', true);
    await manufacturer.expectSuccess();
  });

});
