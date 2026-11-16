const { expect } = require('@playwright/test');

class NavbarPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goToFuelType() {
    await this.page.getByRole('list').getByText('Master').click();
    await this.page.getByRole('list').getByText('Fuel Type').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToServiceType() {
    await this.page.getByRole('list').getByText('Master').click();
    await this.page.getByRole('list').getByText('Service Type').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToDocumentType() {
    await this.page.getByRole('list').getByText('Master').click();
    await this.page.getByRole('list').getByText('Document Type').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToTask() {
    await this.page.getByRole('list').getByText('Master').click();
    await this.page.getByRole('list').getByText('Task').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToSubplant() {
    await this.page.getByRole('list').getByText('Plant & Equipment').click();
    await this.page.getByRole('list').getByText('Sub Plant List').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToServiceSchedule() {
    await this.page.getByRole('list').getByText('Master').click();
    await this.page.getByRole('list').getByText('Service Schedule').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToExternalServiceEngineer() {
    await this.page.getByRole('list').getByText('Master').click();
    await this.page.getByRole('list').getByText('External Service Engineer').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToManufacturerPNM() {
    await this.page.getByRole('list').getByText('Plant & Equipment').click();
    await this.page.getByRole('list').getByText('Manufacturer').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToModelPNM() {
    await this.page.getByRole('list').getByText('Plant & Equipment').click();
    await this.page.getByRole('list').getByText('Model').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToOtherAssetManufacturer() {
    await this.page.getByRole('list').getByText('Other Asset').click();
    await this.page.getByRole('list').getByText('Manufacturer').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToOtherAssetModel() {
    await this.page.getByRole('list').getByText('Other Asset').click();
    await this.page.getByRole('list').getByText('Model').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToRequisition() {
    await this.page.getByRole('list').getByText('Procurement').click();
    await this.page.getByRole('list').getByText('Requistion').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToIndent() {
    await this.page.getByRole('list').getByText('Procurement').click();
    await this.page.getByRole('list').getByText('Indent').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToPurchaseOrder() {
    await this.page.getByRole('list').getByText('Procurement').click();
    await this.page.getByRole('list').getByText('Purchase Order').click();
    await expect(this.page.getByRole('button', { name: 'Add' })).toBeVisible();
  }

  async goToUpdateAssetCode() {
    await this.page.getByRole('list').getByText('Plant & Equipment').click();
    await this.page.getByText('Update Asset Code').click();
  }

  async goToDriverEquipmentMapping() {
    await this.page.getByRole('list').getByText('Master').click();
    await this.page.getByText('Driver Equipment Mapping').click();
  }

  async goToSupervisorMapping() {
    await this.page.getByRole('list').getByText('Master').click();
    await this.page.getByText('Supervisor Mapping').click();
  }

  async goToDailyUtilization() {
    await this.page.getByRole('list').getByText('DPR').click();
    await this.page.getByText('Daily Utilization').click();
  }
}

module.exports = { NavbarPage };
