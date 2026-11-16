const { expect } = require('@playwright/test');
const { escapeRegex } = require('../utils');

class SupervisorMappingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.submitButton = page.getByRole('button', { name: 'submit' });
    this.successToast = page.getByText('SUCCESS');
  }

  row(searchTerm) {
    return this.page.getByRole('row', { name: new RegExp(escapeRegex(searchTerm)) });
  }

  async search(searchTerm) {
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press('Enter');
    await expect(this.row(searchTerm)).toBeVisible();
  }

  async openEditFor(searchTerm) {
    await this.row(searchTerm).getByRole('img', { name: 'edit' }).click();
  }

  async selectRowDropdown(index, optionName) {
    await this.page.getByRole('combobox').nth(index).click();
    await this.page.getByRole('option', { name: optionName }).click();
  }

  async selectSupervisor(searchTerm, driverSearchText, optionName) {
    const supervisorCombobox = this.row(searchTerm)
      .getByRole('cell')
      .nth(6)
      .getByRole('combobox');

    await supervisorCombobox.click();
    await supervisorCombobox.fill(driverSearchText);
    await this.page.getByRole('option', { name: optionName, exact: true }).click();
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectSuccess() {
    await expect(this.successToast).toBeVisible({ timeout: 10_000 });
  }
}

module.exports = { SupervisorMappingPage };