const { test, expect } = require('../../../fixtures/base.fixture');
const { FuelTypePage } = require('../../../pages/FuelTypePage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Fuel Type Master — End-to-End Tests
 *
 * Pre-condition: the `storePage` fixture handles login + site selection,
 * so every test here starts already inside the P&M Master site dashboard.
 *
 * Tags:
 *   @smoke      — critical happy path
 *   @positive   — happy-path scenarios
 *   @fuel-type  — scope filter for this module
 */

test.describe('Fuel Type Master', () => {

  test('@smoke @positive TC-FT-01: Fuel Type menu item opens the list', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const fuelType = new FuelTypePage(page);
    await navbar.goToFuelType();
    await fuelType.openAddForm();
    await fuelType.fillAndSubmit('mobil diesel oill', true);
    await fuelType.expectSuccess();
  });

});
