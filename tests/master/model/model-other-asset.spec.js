const { test, expect } = require('../../../fixtures/base.fixture');
const { ModelOtherAssetPage } = require('../../../pages/ModelOtherAssetPage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Model other asset — End-to-End Tests
 *
 * Pre-condition: the `storePage` fixture handles login + site selection,
 * so every test here starts already inside the P&M Master site dashboard.
 *
 * Tags:
 *   @smoke      — critical happy path
 *   @positive   — happy-path scenarios
 *   @model-Other-Asset  — scope filter for this module
 */

test.describe('Model Other Asset', () => {

  test('@smoke @positive TC-MP-01: Model Other Asset menu item opens the list', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const modelOtherAsset = new ModelOtherAssetPage(page);
    await navbar.goToOtherAssetModel();
    await modelOtherAsset.openAddForm();
    await modelOtherAsset.fillAndSubmit('Test Model', 'Test Manufacturer other assett', 'TM-001', false);
    await modelOtherAsset.expectSuccess();
  });

});
