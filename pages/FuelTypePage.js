const { expect } = require('@playwright/test');

class FuelTypePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addButton         = page.getByRole('button', { name: 'Add' });

    this.addFuelTypeHeading = page.getByRole('heading', { name: 'Add Fuel Type' });
    this.nameInput          = page.getByRole('textbox', { name: 'Name' });
    this.activeCheckbox     = page.getByRole('checkbox');
    this.submitAddButton    = page.getByRole('button', { name: 'Add' });

    this.successToast = page.getByText('Successfully Saved');
  }

  async openAddForm() {
    await this.addButton.click();
    await expect(this.addFuelTypeHeading).toBeVisible();
  }

  /**
   * Fill and submit the Add Fuel Type form.
   * @param {string} name     Fuel type name to enter.
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

module.exports = { FuelTypePage };
