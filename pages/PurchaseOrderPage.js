const { expect } = require('@playwright/test');

/**
 * @typedef {{
 *   type: 'Equipment' | 'Plant' | 'Tools & Tackles',
 *   category: string,
 *   manufacturer: string,
 *   manufacturerOption: string,
 *   model: string,
 *   qty: string,
 *   approvedQty: string,
 *   tollerance: string,
 *   rate: string,
 *   discount?: string,
 *   gst?: string,
 *   total?: string,
 *   remarks: string
 * }} PurchaseOrderRow
 */

class PurchaseOrderPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.addButton = page.getByRole('button', { name: 'Add' });
    this.createButton = page.getByRole('button', { name: 'Create' });
    this.approveButton = page.getByRole('button', { name: 'Approve' });
    this.chooseFileButton = page.getByRole('button', { name: 'Choose File' });
    this.fileInput        = page.locator('input[type="file"]');
    this.successMessage   = page.getByText('SUCCESS');
    this.documentLink = page.getByRole('link', { name: 'document' });
  }

  async openAddForm() {
    await this.addButton.click();
  }

  /**
   * @param {{
   *   supplier: string,
   *   supplierOption: string,
   *   addressOption: string,
   *   store: string,
   *   storeOption: string,
   *   subject: string,
   *   deliveryDate: string,
   *   refNumber: string,
   *   dispatchMode: string
   * }} data
   */
  async fillHeader(data) {
    await this.page.getByRole('combobox', { name: 'Select Supplier Name' }).fill(data.supplier);
    await this.page.getByRole('option', { name: data.supplierOption }).click();

    await this.page.getByRole('combobox', { name: 'Select Supplier Address' }).click();
    await this.page.getByRole('option', { name: data.addressOption }).click();

    await this.page.getByRole('combobox', { name: 'Select Store' }).fill(data.store);
    await this.page.getByRole('option', { name: data.storeOption }).click();

    await this.page.getByRole('textbox', { name: 'Subject' }).fill(data.subject);
    await this.page.getByRole('textbox', { name: 'Expected Delivery Date' }).fill(data.deliveryDate);
    await this.page.getByRole('textbox', { name: 'Ref. Number' }).fill(data.refNumber);
    await this.page.getByRole('textbox', { name: 'Dispatch Mode' }).fill(data.dispatchMode);
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
  typeDropdown(rowIndex) {
    return this.row(rowIndex).getByRole('combobox', { name: 'Select Type' });
  }

  /**
   * @param {number} rowIndex
   */
  categoryDropdown(rowIndex) {
    return this.row(rowIndex).getByRole('combobox', { name: 'Select Category' });
  }

  /**
   * @param {number} rowIndex
   */
  manufacturerDropdown(rowIndex) {
    return this.row(rowIndex).getByRole('combobox', { name: 'Select Manufacture' });
  }

  /**
   * @param {number} rowIndex
   */
  modelDropdown(rowIndex) {
    return this.row(rowIndex).getByRole('combobox', { name: 'Select Model' });
  }

  /**
   * @param {number} rowIndex
   */
  qtyInput(rowIndex) {
    return this.row(rowIndex).getByRole('spinbutton').nth(0);
  }

  /**
   * @param {number} rowIndex
   */
  approvedQtyInput(rowIndex) {
    return this.row(rowIndex).getByRole('spinbutton').nth(1);
  }

  /**
   * @param {number} rowIndex
   */
  tolleranceInput(rowIndex) {
    return this.row(rowIndex).getByRole('spinbutton').nth(2);
  }

  /**
   * @param {number} rowIndex
   */
  rateInput(rowIndex) {
    return this.row(rowIndex).getByRole('spinbutton').nth(3);
  }

  /**
   * @param {number} rowIndex
   */
  discountInput(rowIndex) {
    return this.row(rowIndex).getByRole('spinbutton').nth(5);
  }

  /**
   * @param {number} rowIndex
   */
  gstInput(rowIndex) {
    return this.row(rowIndex).getByRole('spinbutton').nth(7);
  }

  /**
   * @param {number} rowIndex
   */
  totalInput(rowIndex) {
    return this.row(rowIndex).getByRole('spinbutton').nth(9);
  }

  /**
   * @param {number} rowIndex
   */
  remarksInput(rowIndex) {
    return this.row(rowIndex).getByRole('textbox').last();
  }

  /**
   * @param {PurchaseOrderRow} row
   * @param {number} rowIndex
   * @param {boolean} shouldAddNext
   */
  async fillRow(row, rowIndex, shouldAddNext) {
    await this.typeDropdown(rowIndex).click();
    await this.page.getByRole('option', { name: row.type }).click();

    await this.categoryDropdown(rowIndex).fill(row.category.slice(0, 3));
    await this.page.getByRole('option', { name: row.category }).click();

    await this.manufacturerDropdown(rowIndex).fill(row.manufacturer);
    await this.page.getByRole('option', { name: row.manufacturerOption }).click();

    await this.modelDropdown(rowIndex).click();
    await this.page.getByRole('option', { name: row.model }).click();

    await this.qtyInput(rowIndex).fill(row.qty);
    await this.approvedQtyInput(rowIndex).fill(row.approvedQty);
    await this.tolleranceInput(rowIndex).fill(row.tollerance);
    await this.rateInput(rowIndex).fill(row.rate);

    if (row.discount) await this.discountInput(rowIndex).fill(row.discount);
    if (row.gst) await this.gstInput(rowIndex).fill(row.gst);
    if (row.total) await this.totalInput(rowIndex).fill(row.total);

    await this.remarksInput(rowIndex).fill(row.remarks);

    if (shouldAddNext) {
      await this.page.getByRole('button', { name: 'Add', exact: true }).click();
    }
  }

  /**
   * @param {PurchaseOrderRow[]} rows
   */
  async addRows(rows) {
    for (let i = 0; i < rows.length; i++) {
      await this.fillRow(rows[i], i, i !== rows.length - 1);
    }
  }

  /**
   * @param {string} type
   */
  async selectFreight(type) {
    await this.page.getByRole('combobox', { name: 'Select Freight Type' }).click();
    await this.page.getByRole('option', { name: type }).click();
  }

  /**
   * @param {string} option
   */
  async selectTerms(option) {
    await this.page.getByRole('combobox', { name: 'Select Terms And Conditons' }).click();
    await this.page.getByRole('option', { name: option }).click();
  }

  /**
   * @param {string} value
   */
  async fillTCS(value) {
    await this.page.getByRole('spinbutton', { name: 'TCS on Sale' }).fill(value);
  }

  /**
   * @param {string} filePath
   */
  async uploadDocument(filePath) {
    await this.fileInput.setInputFiles(filePath);
  }

  /**
   * @param {string} remark
   */
  async fillRemark(remark) {
    await this.page.getByRole('textbox', { name: 'Remark' }).fill(remark);
  }

  async submit() {
    await this.createButton.click();
    await expect(this.successMessage).toBeVisible({ timeout: 15_000 });
  }

  async openAndApprove() {
    const rowCell = this.page.locator('div.css-we4z7z div.css-9gb5nv div.css-hwk4ky table tbody tr:nth-of-type(1) td:nth-of-type(2)');
    await rowCell.click();
    await this.approveButton.click();
    await expect(this.successMessage).toBeVisible({ timeout: 15_000 });
  }
}

module.exports = { PurchaseOrderPage };

