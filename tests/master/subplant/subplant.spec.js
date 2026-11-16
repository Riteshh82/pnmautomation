const { test, expect } = require('../../../fixtures/base.fixture');
const { SubplantPage } = require('../../../pages/SubplantPage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Subplant Master — End-to-End Tests
 *
 * Pre-condition: the `storePage` fixture handles login + site selection,
 * so every test here starts already inside the P&M Master site dashboard.
 *
 * Tags:
 *   @smoke      — critical happy path
 *   @positive   — happy-path scenarios
 */

test.describe('Subplant Master', () => {

  test('@smoke @positive TC-FT-01: Subplant menu item opens the list', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const subplant = new SubplantPage(page);
    await navbar.goToSubplant();
    await subplant.openAddForm();
    await subplant.fillAndSubmit('mobil diesel ooil', 'this is a description', 'HMP plant category');
    await subplant.expectSuccess();
  });

});
