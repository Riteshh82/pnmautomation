const { expect } = require('@playwright/test');

/**
 * Page Object Model for External Service Engineer master screen.
 *
 * Path: P&M Master → External Service Engineer
 */
class ExternalServiceEngineerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.listHeading = page.getByRole('row', { name: 'S No. Engineer Name Company' });
    this.addButton   = page.getByRole('button', { name: 'Add' });
    this.addFormHeading      = page.getByRole('heading', { name: 'Add External Service Engineer' });
    this.companyNameDropdown  = page.getByRole('combobox', { name: 'Select Company Name' });
    this.personNameInput     = page.getByRole('textbox',  { name: 'Person Name' });
    this.contactNoInput      = page.getByRole('textbox',  { name: 'Contact No' });
    this.personalAddressInput = page.getByRole('textbox',  { name: 'Personal Address' });
    this.rateInput           = page.getByRole('spinbutton', { name: 'Rate' });
    this.unitOfRateDropdown  = page.getByRole('combobox', { name: 'Select Unit of Rate' });
    this.activeCheckbox      = page.getByRole('checkbox');
    this.submitButton        = page.getByRole('button', { name: 'Add' });
    this.successToast = page.getByText('Successfully Saved');
  }

  async openAddForm() {
    await this.addButton.click();
    await expect(this.addFormHeading).toBeVisible();
  }

  /**
   * Select a company from the dropdown by typing a search term.
   * @param {string} searchTerm  Text to type into the combobox to filter options.
   * @param {string} optionName  Exact option label to click once visible.
   */
  async selectCompany(searchTerm, optionName) {
    await this.companyNameDropdown.click();
    await this.companyNameDropdown.fill(searchTerm);
    await this.page.getByRole('option', { name: optionName }).nth(1).click();
  }

  /**
   * Select a unit of rate from the dropdown by typing a search term.
   * @param {string} searchTerm  Text to type to filter options.
   * @param {string} optionName  Exact option label to click.
   */
  async selectUnitOfRate(searchTerm, optionName) {
    await this.unitOfRateDropdown.click();
    await this.unitOfRateDropdown.fill(searchTerm);
    await this.page.getByRole('option', { name: optionName }).click();
  }

  /**
   * Fill all form fields and submit.
   *
   * @param {{
   *   companySearchTerm: string,
   *   companyOption: string,
   *   personName: string,
   *   contactNo: string,
   *   address: string,
   *   rate: string,
   *   unitSearchTerm: string,
   *   unitOption: string,
   *   isActive?: boolean
   * }} data
   */
  async fillAndSubmit(data) {
    await this.selectCompany(data.companySearchTerm, data.companyOption);
    await this.personNameInput.fill(data.personName);
    await this.contactNoInput.fill(data.contactNo);
    await this.personalAddressInput.fill(data.address);
    await this.rateInput.fill(data.rate);
    await this.selectUnitOfRate(data.unitSearchTerm, data.unitOption);

    if (data.isActive !== false) {
      await this.activeCheckbox.check();
    }

    await this.submitButton.click();
  }

  async expectSuccess() {
    await expect(this.successToast).toBeVisible({ timeout: 10_000 });
  }
}

module.exports = { ExternalServiceEngineerPage };
