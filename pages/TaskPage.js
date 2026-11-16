const { expect } = require('@playwright/test');

class TaskPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.addButton            = page.getByRole('button', { name: 'Add' });
    this.addTaskHeading       = page.getByRole('heading', { name: 'Add Task' });
    this.nameInput            = page.getByRole('textbox', { name: 'Name' });
    this.actionToBeTakenInput = page.getByRole('textbox', { name: 'Action To Be Taken' });
    this.activeCheckbox       = page.getByRole('checkbox');
    this.submitAddButton      = page.getByRole('button', { name: 'Add' });
    this.successToast         = page.getByText('Success');

    // Adjust selectors to match your app's actual error/cancel elements
    this.nameError   = page.locator('[data-testid="name-error"], .name-error, #name-error');
    this.actionError = page.locator('[data-testid="action-error"], .action-error, #action-error');
    this.errorToast  = page.getByText(/error|failed|something went wrong/i);
    this.cancelButton = page.getByRole('button', { name: /cancel|close|dismiss/i });
  }

  async openAddForm() {
    await this.addButton.click();
    await expect(this.addTaskHeading).toBeVisible();
  }

  /**
   * @param {string} name
   * @param {string} actionToBeTaken
   * @param {boolean} isActive
   */
  async fillAndSubmit(name, actionToBeTaken, isActive = true) {
    await this.nameInput.fill(name);
    await this.actionToBeTakenInput.fill(actionToBeTaken);

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

  // ── Negative-test helpers ──────────────────────────────────────────────

  async cancelForm() {
    await this.cancelButton.click();
  }

  async expectFormVisible() {
    await expect(this.addTaskHeading).toBeVisible();
  }

  async expectFormClosed() {
    await expect(this.addTaskHeading).not.toBeVisible();
  }

  async expectNameError() {
    await expect(this.nameError).toBeVisible();
  }

  async expectActionError() {
    await expect(this.actionError).toBeVisible();
  }

  async expectNoSuccessToast() {
    await expect(this.successToast).not.toBeVisible({ timeout: 3_000 });
  }

  async expectErrorToast() {
    await expect(this.errorToast).toBeVisible({ timeout: 10_000 });
  }

  async getAddFormCount() {
    return this.page.getByRole('heading', { name: 'Add Task' }).count();
  }

  /**
   * @param {string} title
   */
  async getTaskCountByTitle(title) {
    return this.page.getByText(title).count();
  }
}

module.exports = { TaskPage };
