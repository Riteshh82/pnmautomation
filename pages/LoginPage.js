
const { expect } = require('@playwright/test');

/**
 * Page Object Model for the Login page.
 *
 * Usage:
 *   const loginPage = new LoginPage(page);
 *   await loginPage.login('EMP001', 'secret');
 */
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.logo = page.getByRole('img', { name: 'Company Logo' });
    this.employeeIdInput = page.getByRole('textbox', { name: 'Employee Code' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.errorAlert = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('heading', { name: 'Inventory Management' })).toBeVisible();
  }

  async login(employeeId, password) {
    await this.goto();
    await this.employeeIdInput.fill(employeeId);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Submit credentials without enforcing networkidle or navigation,
   * used for negative test cases where login is expected to fail or be prevented.
   */
  async attemptLogin(employeeId, password) {
    await this.goto();
    if (employeeId) await this.employeeIdInput.fill(employeeId);
    if (password) await this.passwordInput.fill(password);
    await this.signInButton.click();
    // Wait briefly for any redirect or error message to appear
    await this.page.waitForTimeout(2000);
  }

  async isErrorVisible() {
    return this.errorAlert.isVisible();
  }

  async getErrorText() {
    return this.errorAlert.textContent();
  }

  async expectErrorAlert() {
    await expect(this.errorAlert).toBeVisible({ timeout: 10_000 });
  }

  async isLoggedIn() {
    // If the login form's employee input is still visible, we're NOT logged in
    const loginFieldVisible = await this.employeeIdInput.isVisible().catch(() => false);
    return !loginFieldVisible;
  }
}

module.exports = { LoginPage };
