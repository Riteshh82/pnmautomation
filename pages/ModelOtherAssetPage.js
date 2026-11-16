const { expect } = require('@playwright/test');

class ModelOtherAssetPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.addButton = page.getByRole('button', { name: 'Add' });
    this.addModelHeading = page.getByRole('heading', { name: 'Add Model' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.manufacturerSelect = page.getByRole('combobox', { name: 'Manufacturer' });
    this.codeInput = page.getByRole('textbox', { name: 'Code' });
    this.activeCheckbox = page.getByRole('checkbox').first();
    this.submitAddButton = page.getByRole('button', { name: 'Add' });
    this.successToast = page.getByText('Added Successfully');
  }

  async openAddForm() {
    await this.addButton.click();
    await expect(this.addModelHeading).toBeVisible();
  }

  /**
   * @param {string} name
   * @param {string} manufacturer
   * @param {string} code
   * @param {boolean} isActive
   */
  async fillAndSubmit(name, manufacturer, code, isActive) {
    await this.nameInput.fill(name);
    await this.manufacturerSelect.click();
    await this.manufacturerSelect.fill(manufacturer);
    const option = this.page.getByRole('option', { name: manufacturer });
    await expect(option).toBeVisible();
    await option.click();
    await this.codeInput.fill(code);
    if (isActive) {
      await this.activeCheckbox.check();
    } else {
      await this.activeCheckbox.uncheck();
    }

    await this.submitAddButton.click();
  }

  async expectSuccess() {
    await expect(this.successToast).toBeVisible({ timeout: 10_000 });
  }
}

module.exports = { ModelOtherAssetPage };
