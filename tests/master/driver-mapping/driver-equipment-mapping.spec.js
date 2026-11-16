const { test, expect } = require('../../../fixtures/base.fixture');
const { NavbarPage } = require('../../../pages/NavbarPage');
const { DriverEquipmentMappingPage } = require('../../../pages/DriverEquipmentMappingPage');


test.describe('Driver Equipment Mapping ', () => {

  test('@smoke @positive TC-DEM-01: Reassign a driver for an equipment and confirm success', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const driverMapping = new DriverEquipmentMappingPage(page);

    await navbar.goToDriverEquipmentMapping();

    await driverMapping.searchByAssetCode('NKC/CE-099/EX-04');
    await driverMapping.openEditFor('NKC/CE-099/EX-04');
    await driverMapping.selectDriver('system', 'System Admin');
    await driverMapping.save();
    await driverMapping.expectSuccess();
  });

});