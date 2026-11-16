const { test, expect } = require('../../../fixtures/base.fixture');
const { NavbarPage } = require('../../../pages/NavbarPage');
const { SupervisorMappingPage } = require('../../../pages/Supervisormappingpage.js');


test.describe('Supervisor Mapping', () => {

  test('@smoke @positive TC-SM-01: Map a supervisor to equipment and confirm success', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const supervisorMapping = new SupervisorMappingPage(page);

    await navbar.goToSupervisorMapping();

    await supervisorMapping.search('NKC/CE-009/TP-03-SEC-103');
    await supervisorMapping.openEditFor('NKC/CE-009/TP-03-SEC-103');

    await supervisorMapping.selectRowDropdown(3, 'WER1');
    await supervisorMapping.selectRowDropdown(4, 'WER1');

    await supervisorMapping.selectSupervisor('NKC/CE-009/TP-03-SEC-103', 'sys', 'System Admin');

    await supervisorMapping.submit();
    await supervisorMapping.expectSuccess();
  });

});