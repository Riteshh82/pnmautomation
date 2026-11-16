const { expect } = require('@playwright/test');

class DriverEquipmentMappingPage {
  constructor(page) {
    this.page = page;

    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.closeButton = page.getByRole('button', { name: 'Close' });
    this.editIcon = page.getByRole('img', { name: 'edit' });

    this.driverSearchCombobox = page.getByRole('combobox', { name: 'Search' });
    this.openButton = page.getByRole('button', { name: 'Open' });
    this.saveButton = page.getByRole('button', { name: 'Save' });

    this.successToast = page.getByText('SUCCESS');
  }

  row(assetCode) {
    return this.page.getByRole('row', { name: (assetCode) });
  }

  async searchByAssetCode(assetCode) {
    await this.searchInput.fill(assetCode);
    await expect(this.closeButton).toBeVisible();
  }

  async openEditFor(assetCode) {
    await this.row(assetCode).getByRole('img', { name: 'edit' }).click();
  }

  async selectDriver(searchTerm, optionName) {
    await this.driverSearchCombobox.fill(searchTerm);
    await this.page.getByRole('option', { name: optionName, exact: true }).click();
    await expect(this.openButton).toBeVisible();
  }

  async save() {
    await this.saveButton.click();
  }

  async expectSuccess() {
    await expect(this.successToast).toBeVisible({ timeout: 10_000 });
  }
}

module.exports = { DriverEquipmentMappingPage };