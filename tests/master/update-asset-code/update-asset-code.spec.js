const { test, expect } = require('../../../fixtures/base.fixture');
const { NavbarPage } = require('../../../pages/NavbarPage');
const { UpdateAssetCodePage } = require('../../../pages/UpdateAssetCodePage.js');

/**
 * Tags:
 *   @smoke      — critical happy path
 *   @positive   — happy-path scenario
 */

test.describe('Update Asset Code', () => {

  test('@smoke @positive TC-UAC-01: Update an asset code and confirm success', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const updateAssetCode = new UpdateAssetCodePage(page);

    await navbar.goToUpdateAssetCode();
    await updateAssetCode.searchByAssetCode('NKC/CE-099/EX-04');
    await updateAssetCode.updateAssetCode('NKC/CE-099/EX-04', 'newassetcode');
    await updateAssetCode.expectSuccess();
  });

});