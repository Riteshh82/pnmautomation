const { test, expect } = require('../../../fixtures/base.fixture');
const { DocumentTypePage } = require('../../../pages/DocumentTypePage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Document Type Master — End-to-End Tests
 *
 * Pre-condition: the `storePage` fixture handles login + site selection,
 * so every test here starts already inside the P&M Master site dashboard.
 *
 * Tags:
 *   @smoke      — critical happy path
 *   @positive   — happy-path scenarios
 *   @document-type  — scope filter for this module
 */

test.describe('Document Type Master', () => {

  test('@smoke @positive TC-DT-01: Document Type menu item opens the list', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const documentType = new DocumentTypePage(page);
    await navbar.goToDocumentType();
    await documentType.openAddForm();
    await documentType.fillAndSubmit('Test Document Typee', true, true, 30, 'Loan');
    await documentType.expectSuccess();
  });

});
