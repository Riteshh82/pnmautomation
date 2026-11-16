const { expect } = require('@playwright/test');

/**
 * @typedef {{
 *   type: 'Equipment' | 'Plant' | 'Other Assets',
 *   category: string,
 *   manufacturer: string,
 *   manufacturerOption: string,
 *   model: string,
 *   reqQuantity: string,
 *   appQuantity: string,
 *   remarks: string
 * }} IndentRow
 */

class IndentPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.addButton = page.getByRole('button', { name: 'Add' });
    this.createButton = page.getByRole('button', { name: 'Create' });
    this.chooseFileButton = page.getByRole('button', { name: 'Choose File' });
    this.documentLink = page.getByRole('link', { name: 'document' });
    this.successMessage   = page.getByText('SUCCESS');
    this.approveButton = page.getByRole('button', { name: 'Approve' });
  }

  async openAddForm() {
    await this.addButton.click();
  }

  /**
   * @param {number} rowIndex
   */
  typeDropdown(rowIndex) {
    return this.page.getByRole('combobox', { name: 'Select Type' }).nth(rowIndex);
  }

  /**
   * @param {number} rowIndex
   */
  categoryDropdown(rowIndex) {
    return this.page.getByRole('combobox', { name: 'Select Category' }).nth(rowIndex);
  }

  /**
   * @param {number} rowIndex
   */
  manufacturerDropdown(rowIndex) {
    return this.page.getByRole('combobox', { name: 'Select Manufacturer' }).nth(rowIndex);
  }

  /**
   * @param {number} rowIndex
   */
  modelDropdown(rowIndex) {
    return this.page.getByRole('combobox', { name: 'Select Model' }).nth(rowIndex);
  }

  /**
   * @param {number} rowIndex
   */
  row(rowIndex) {
    return this.page.locator('table tbody tr').nth(rowIndex);
  }

/**
 * @param {number} rowIndex
 */
reqQuantityInput(rowIndex) {
  return this.row(rowIndex).locator('td').nth(5).getByRole('textbox');
}

/**
 * @param {number} rowIndex
 */
appQuantityInput(rowIndex) {
  return this.row(rowIndex).locator('td').nth(6).getByRole('textbox');
}

/**
 * @param {number} rowIndex
 */
remarksInput(rowIndex) {
  return this.row(rowIndex).locator('td').nth(9).getByRole('textbox');
}

  /**
   * @param {IndentRow} row
   * @param {number} rowIndex
   * @param {boolean} shouldAddNextRow
   */
  async fillRow(row, rowIndex, shouldAddNextRow) {
    await this.typeDropdown(rowIndex).click();
    await this.page.getByRole('option', { name: row.type }).click();
    await this.categoryDropdown(rowIndex).click();
    await this.categoryDropdown(rowIndex).fill(row.category.slice(0, 3));
    await this.page.getByRole('option', { name: row.category }).click();
    await this.manufacturerDropdown(rowIndex).click();
    await this.manufacturerDropdown(rowIndex).fill(row.manufacturer);
    await this.page.getByRole('option', { name: row.manufacturerOption }).click();
    await this.modelDropdown(rowIndex).click();
    await this.page.getByRole('option', { name: row.model }).click();
    await this.reqQuantityInput(rowIndex).fill(row.reqQuantity);

    if (row.appQuantity) {
      await this.appQuantityInput(rowIndex).fill(row.appQuantity);
    }
    await this.remarksInput(rowIndex).fill(row.remarks);

    if (shouldAddNextRow) {
      await this.page.getByRole('button', { name: 'Add' }).click();
    }
  }

  /**
   * @param {IndentRow[]} rows
   */
  async addRows(rows) {
    for (let i = 0; i < rows.length; i++) {
      const isLast = i === rows.length - 1;
      await this.fillRow(rows[i], i, !isLast);
    }
  }

  /**
   * @param {string} filePath
   */
  async uploadDocument(filePath) {
    await this.chooseFileButton.setInputFiles(filePath);
    await expect(this.documentLink).toBeVisible();
  }

  async submit() {
    await this.createButton.click();
    await expect(this.successMessage).toBeVisible({ timeout: 15_000 });
  }

  async open() {
    const rowCell = this.page.locator('div.css-9gb5nv div.css-hwk4ky table tbody tr:nth-of-type(1) td:nth-of-type(3)');
    await rowCell.click();
  }

  async approve() {
    await this.approveButton.click();
    await expect(this.successMessage).toBeVisible();
  }
}

module.exports = { IndentPage };
