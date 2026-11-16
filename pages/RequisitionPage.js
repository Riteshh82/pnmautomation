const { expect } = require('@playwright/test');

/**
 * @typedef {{
 *   machineType: 'Equipment',
 *   category: string,
 *   manufacturer: string,
 *   manufacturerOption: string,
 *   model: string,
 *   quantity: string,
 *   remarks: string
 * }} EquipmentRow
 *
 * @typedef {{
 *   machineType: 'Plant',
 *   category: string,
 *   manufacturer: string,
 *   manufacturerOption: string,
 *   model: string,
 *   quantity: string,
 *   remarks: string
 * }} PlantRow
 *
 * @typedef {{
 *   machineType: 'Other Asset',
 *   category: string,
 *   manufacturer: string,
 *   manufacturerOption: string,
 *   model: string,
 *   quantity: string,
 *   remarks: string
 * }} OtherAssetRow
 *
 * @typedef {EquipmentRow | PlantRow | OtherAssetRow} RequisitionRow
 */

class RequisitionPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.addButton        = page.getByRole('button', { name: 'Add' });
    this.firstOpenRow     = page.getByRole('row', { name: 'Open Open Open Open' });
    this.chooseFileButton = page.getByRole('button', { name: 'Choose File' });
    this.fileInput        = page.locator('input[type="file"]');
    this.documentLink     = page.getByRole('link', { name: 'document' });
    this.createButton     = page.getByRole('button', { name: 'Create' });
    this.successMessage   = page.getByText('SUCCESS');
    this.approveButton    = page.getByRole('button', { name: 'Approve' });
  }

  async openAddForm() {
    await this.addButton.click();
    await expect(this.firstOpenRow).toBeVisible();
  }

  /**
   * @param {number} rowIndex
   * @returns {import('@playwright/test').Locator}
   */
  machineTypeInput(rowIndex) {
    if (rowIndex === 0) {
      return this.page.locator('#header').first();
    }
    return this.page
      .locator(`tr:nth-child(${rowIndex + 1}) td:nth-child(1) #header`);
  }

  /**
   * @param {number} rowIndex
   * @returns {import('@playwright/test').Locator}
   */
  categoryCombobox(rowIndex) {
    if (rowIndex === 0) {
      return this.page.getByRole('combobox').nth(2);
    }
    return this.page
      .locator(`tr:nth-child(${rowIndex + 1}) td:nth-child(2)`)
      .getByRole('combobox');
  }

  /**
   * @param {number} rowIndex
   * @returns {import('@playwright/test').Locator}
   */
  quantityInput(rowIndex) {
    return this.page.getByRole('textbox').nth(rowIndex * 4 + 2);
  }

  /**
   * @param {number} rowIndex
   * @returns {import('@playwright/test').Locator}
   */
  remarksInput(rowIndex) {
    return this.page.getByRole('textbox').nth(rowIndex * 4 + 3);
  }

  /**
   * @param {RequisitionRow} row
   * @param {number} rowIndex
   * @param {boolean} shouldAddNextRow
   */
async fillRow(row, rowIndex, shouldAddNextRow) {
  const rowLocator = this.page.getByRole('row').nth(rowIndex + 1);

  const machineType = rowLocator.getByRole('combobox').nth(0);
  await machineType.click();
  await machineType.fill(row.machineType);
  await this.page.getByRole('option', { name: row.machineType }).click();

  const category = rowLocator.getByRole('combobox').nth(1);
  await category.click();
  await this.page.getByRole('option', { name: row.category }).click();

  const manufacturer = rowLocator.getByRole('combobox', { name: 'Select Manufacturer' });
  await manufacturer.fill(row.manufacturer);
  await this.page.getByRole('option', { name: row.manufacturerOption }).click();

  const model = rowLocator.getByRole('combobox', { name: 'Select Model' });
  await model.click();
  await this.page.getByRole('option', { name: row.model }).click();

  // QTY is column 7, Remarks is column 8 — target by column, not textbox order
  await rowLocator.locator('td').nth(6).getByRole('textbox').fill(row.quantity);
  await rowLocator.locator('td').nth(7).getByRole('textbox').fill(row.remarks);

  if (shouldAddNextRow) {
    await this.page.getByRole('button', { name: 'Add' }).click();
  }

  }

  /**
   * Fill N rows in the requisition form.
   * Pass any mix of EquipmentRow, PlantRow, OtherAssetRow.
   *
   * @example
   * await requisition.addRows([
   *   { category: 'Equipment', subCategory: 'JCB hydraulic', ... },
   *   { category: 'Plant',     subCategory: 'test 17 sept',  ... },
   * ]);
   *
   * @param {RequisitionRow[]} rows
   */
  async addRows(rows) {
    for (let i = 0; i < rows.length; i++) {
      const isLast = i === rows.length - 1;

      await this.fillRow(rows[i], i, !isLast);
    }
  }

  /**
   * Upload a supporting document.
   * @param {string} filePath  Absolute or relative path to the file.
   */
  async uploadDocument(filePath) {
    await this.fileInput.setInputFiles(filePath);
    await expect(this.documentLink).toBeVisible();
  }

  async submit() {
    await this.createButton.click();
    await expect(this.successMessage).toBeVisible({ timeout: 15_000 });
  }

  async openAndApprove() {
    const rowCell = this.page.locator('div.css-9gb5nv div.css-hwk4ky table tbody tr:nth-of-type(1) td:nth-of-type(2)');
    await rowCell.click();
    await this.approveButton.click();
    await expect(this.successMessage).toBeVisible({ timeout: 15_000 });
  }
}

module.exports = { RequisitionPage };
