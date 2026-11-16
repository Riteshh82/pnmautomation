const { test, expect } = require('../../../fixtures/base.fixture');
const { ExternalServiceEngineerPage } = require('../../../pages/ExternalServiceEngineerPage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * External Service Engineer Master — End-to-End Tests
 *
 * Pre-condition: `PnMPage` fixture handles login + site selection.
 * Every test starts inside the P&M Master dashboard.
 *
 * Tags:
 *   @smoke                      — critical happy path
 *   @positive                   — happy-path scenarios
 *   @external-service-engineer  — scope filter for this module
 */

test.describe('External Service Engineer Master', () => {

  test('@smoke @positive TC-ESE-01: Add external service engineer with all fields shows success',
    async ({ PnMPage: page }) => {
      const engineerPage = new ExternalServiceEngineerPage(page);
      const navbar = new NavbarPage(page);
      await navbar.goToExternalServiceEngineer();
      await engineerPage.openAddForm();
      await engineerPage.fillAndSubmit({
        companySearchTerm: 'HADIMBA SERVICE STATION',
        companyOption:     'HADIMBA SERVICE STATION',
        personName:        'Aditya Awasthi',
        contactNo:         '9876543212',
        address:           'udyog vihar',
        rate:              '1000',
        unitSearchTerm:    'ho',
        unitOption:        'Hours',
        isActive:          true,
      });
      await engineerPage.expectSuccess();
  });

});
