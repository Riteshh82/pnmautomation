const { expect } = require('@playwright/test');
const { escapeRegex } = require('../utils');

class UpdateAssetCodePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.successToast = page.getByRole('alert');
  }

  /**
   * Locates the row for a given asset code (used both to search results
   * and to scope the inline edit input within that row).
   * @param {string} assetCode  Exact asset code, e.g. "NKC/CE-099/EX-04".
   */
  row(assetCode) {
    return this.page.getByRole('row', { name: new RegExp(`^1 ${escapeRegex(assetCode)}`) });
  }

  /**
   * @param {string} assetCode  Asset code to search for, e.g. "NKC/CE-099/EX-04".
   */
  async searchByAssetCode(assetCode) {
    await this.searchInput.fill(assetCode);
    await expect(this.row(assetCode)).toBeVisible();
  }

  /**
   * Updates the asset code inline for the row currently matched by
   * `currentAssetCode`, then submits the change.
   * @param {string} currentAssetCode  The asset code to find and edit.
   * @param {string} newAssetCode      The new value to set.
   */
  async updateAssetCode(currentAssetCode, newAssetCode) {
    const row = this.row(currentAssetCode);
    await row.getByRole('textbox').fill(newAssetCode);
    await this.page.getByRole('button', { name: 'submit' }).click();
  }

  async expectSuccess() {
    await expect(this.successToast).toBeVisible({ timeout: 10_000 });
  }
}

module.exports = { UpdateAssetCodePage };