const { test, expect } = require('../../../fixtures/base.fixture');
const { ServiceTypePage } = require('../../../pages/ServiceTypePage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Service Type Master — End-to-End Tests
 *
 * Pre-condition: the `storePage` fixture handles login + site selection,
 * so every test here starts already inside the P&M Master site dashboard.
 *
 * Tags:
 *   @smoke      — critical happy path
 *   @positive   — happy-path scenarios
 */

test.describe('Service Type Master', () => {

  test('@smoke @positive TC-ST-01: Service Type menu item opens the list', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const serviceType = new ServiceTypePage(page);
    await navbar.goToServiceType();
    await serviceType.openAddForm();
    await serviceType.fillAndSubmit('Service type test infinityy', true);
    await serviceType.expectSuccess();
  });

});
