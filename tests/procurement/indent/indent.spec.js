const { test } = require('../../../fixtures/base.fixture');
const { IndentPage } = require('../../../pages/IndentPage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Indent Procurement — End-to-End Tests
 *
 * Tags:
 *   @smoke     — critical happy path
 *   @positive  — happy-path scenarios
 *   @indent    — scope filter for this module
 */

test.describe('Indent Procurement', () => {

  test('@smoke @positive TC-INDENT-01: Create and approve indent', async ({ PnMPage: page }) => {
    const indent = new IndentPage(page);
    const navbar = new NavbarPage(page);
    await navbar.goToIndent();
    await indent.openAddForm();
    await indent.addRows([
      {
        type: 'Equipment',
        category: 'JCB hydraulic',
        manufacturer: 'tata',
        manufacturerOption: 'TATA STAR',
        model: '+1S -LP712/42 BSIII',
        reqQuantity: '2',
        appQuantity: '2',
        remarks: 'indent'
      },
    ]);

    await indent.uploadDocument('assets/upload.png');
    await indent.submit();
    await indent.open();
    await indent.approve();
  });

});

