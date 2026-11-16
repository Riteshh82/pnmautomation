const { expect } = require('@playwright/test');

class ManufacturerPNMPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addButton         = page.getByRole('button', { name: 'Add' });

    this.addManufacturerHeading = page.getByRole('heading', { name: 'Add Manufacturer' });
    this.nameInput          = page.getByRole('textbox', { name: 'Name' });
    this.activeCheckbox     = page.getByRole('checkbox');
    this.submitAddButton    = page.getByRole('button', { name: 'Add' });

    this.successToast = page.getByText('Added Successfully');
  }

  async openAddForm() {
    await this.addButton.click();
    await expect(this.addManufacturerHeading).toBeVisible();
  }

  /**
   * Fill and submit the Add Manufacturer form.
   * @param {string} name     Manufacturer name to enter.
   * @param {boolean} isActive Whether the Active checkbox should be checked (default true).
   */
  async fillAndSubmit(name, isActive = true) {
    await this.nameInput.fill(name);

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

module.exports = { ManufacturerPNMPage };
