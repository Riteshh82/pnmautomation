const { test, expect } = require('../../../fixtures/base.fixture');
const { FuelTypePage } = require('../../../pages/FuelTypePage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Fuel Type Master — Negative Test Scenarios
 *
 * Tags:
 *   @negative   — negative flow filter
 *   @fuel-type  — scope filter
 */

test.describe('Fuel Type Master — Negative Scenarios', () => {

  test('@negative TC-FT-NEG-01: Empty Fuel Type name submission is prevented', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const fuelType = new FuelTypePage(page);

    await navbar.goToFuelType();
    await fuelType.openAddForm();

    // Click submit without entering a name
    await fuelType.submitAddButton.click();

    // Verify success toast does NOT appear
    await expect(fuelType.successToast).not.toBeVisible({ timeout: 3_000 });

    // Verify form remains open
    await expect(fuelType.addFuelTypeHeading).toBeVisible();
  });

});
