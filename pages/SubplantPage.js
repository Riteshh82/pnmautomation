const { expect } = require('@playwright/test');

class SubplantPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.addButton          = page.getByRole('button', { name: 'Add' });
    this.addSubplantHeading = page.getByRole('heading', { name: 'Add Sub plant' });
    this.nameInput          = page.getByRole('textbox', { name: 'Name' });
    this.descriptionInput   = page.getByRole('textbox', { name: 'Description' });
    this.plantcategory = page.getByRole('combobox', { name: 'Plant Category' });
    this.submitAddButton    = page.getByRole('button', { name: 'Add' });
    this.successToast       = page.getByText('Success');
  }

  async openAddForm() {
    await this.addButton.click();
    await expect(this.addSubplantHeading).toBeVisible();
  }

  /**
   * Fill and submit the Add Subplant form.
   * @param {string} name        Subplant name to enter.
   * @param {string} description Subplant description to enter.
   * @param {string} plantCategory Subplant category to select.
   * @param {boolean} isActive
   */
  async fillAndSubmit(name, description, plantCategory, isActive = true) {
    await this.nameInput.fill(name);
    await this.descriptionInput.fill(description);
    await this.plantcategory.click();
    await this.plantcategory.fill(plantCategory);
    const option = this.page.getByRole('option', { name: plantCategory });
    await expect(option).toBeVisible();
    await option.click();

    await this.submitAddButton.click();
  }

  async expectSuccess() {
    await expect(this.successToast).toBeVisible({ timeout: 10_000 });
  }
}

module.exports = { SubplantPage };
