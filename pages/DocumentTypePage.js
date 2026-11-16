const { expect } = require('@playwright/test');

class DocumentTypePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.addButton = page.getByRole('button', { name: 'Add' });
    this.addDocumentTypeHeading = page.getByRole('heading', { name: 'Add Document Type' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.notificationDaysInput = page.getByRole('textbox', { name: 'Notification Days' });
    this.documentTypeSelect = page.getByRole('combobox', { name: 'Document Type' });
    this.activeCheckbox = page.getByRole('checkbox').first();
    this.financeCheckbox = page.getByRole('checkbox').nth(1);

    this.submitAddButton = page.getByRole('button', { name: 'Add' });
    this.successToast = page.getByText('Successfully Saved');
  }

  async openAddForm() {
    await this.addButton.click();
    await expect(this.addDocumentTypeHeading).toBeVisible();
  }

  /**
   * @param {string} name
   * @param {boolean} isActive
   * @param {boolean} isFinance
   * @param {number} notificationDays
   * @param {string} documentType
   */
  async fillAndSubmit(name, isActive = true, isFinance = false, notificationDays, documentType) {
    await this.nameInput.fill(name);
    await this.notificationDaysInput.fill(notificationDays.toString());

    await this.documentTypeSelect.click();
    await this.documentTypeSelect.fill(documentType);

    const option = this.page.getByRole('option', { name: documentType });
    await expect(option).toBeVisible();
    await option.click();

    if (isActive) {
      await this.activeCheckbox.check();
    } else {
      await this.activeCheckbox.uncheck();
    }

    if (isFinance) {
      await this.financeCheckbox.check();
    } else {
      await this.financeCheckbox.uncheck();
    }

    await this.submitAddButton.click();
  }

  async expectSuccess() {
    await expect(this.successToast).toBeVisible({ timeout: 10_000 });
  }
}

module.exports = { DocumentTypePage };
