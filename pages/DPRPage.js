const { expect } = require('@playwright/test');
const { escapeRegex } = require('../utils');

class DPRPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.successToast = page.getByRole('alert');
  }

  row(assetCode) {
    return this.page.getByRole('row', { name: new RegExp(`^1 ${escapeRegex(assetCode)}`) });
  }

  async searchByAssetCode(assetCode) {
    await this.searchInput.fill(assetCode);
    await expect(this.row(assetCode)).toBeVisible();
  }

  async updateAssetCode(currentAssetCode, newAssetCode) {
    const row = this.row(currentAssetCode);
    await row.getByRole('textbox').fill(newAssetCode);
    await this.page.getByRole('button', { name: 'submit' }).click();
  }

  async expectSuccess() {
    await expect(this.successToast).toBeVisible({ timeout: 10_000 });
  }
}

module.exports = { DPRPage };