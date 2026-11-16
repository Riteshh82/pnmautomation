const { expect } = require('@playwright/test');

/**
 * @typedef {{ taskName: string, itemName: string, quantity: number }} Task
 * @typedef {{
 *   serviceName: string,
 *   periodDays: number,
 *   primaryReading: number,
 *   secondaryReading: number,
 *   isActive?: boolean,
 *   tasks: Task[],
 *   alert: {
 *     dayBefore: number,
 *     readingBefore: number,
 *     secondaryReadingBefore: number,
 *     message: string,
 *     remark: string
 *   }
 * }} Template
 */

class ServiceSchedulePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.addButton = page.getByRole('button', { name: 'Add' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async openAddForm() {
    await this.addButton.click();
    await expect(this.page.getByRole('textbox', { name: 'Service Name' })).toBeVisible();
  }

  /**
   * @param {string} category
   * @param {string} manufacture
   * @param {string} model
   */
  async selectEquipment(category, manufacture, model) {
    await this.page.getByRole('combobox', { name: 'Equipment Category' }).fill(category);
    await this.page.getByRole('option', { name: new RegExp(category, 'i') }).click();

    await this.page.getByRole('combobox', { name: 'Select Manufacture' }).fill(manufacture);
    await this.page.getByRole('option', { name: new RegExp(manufacture, 'i') }).click();

    await this.page.getByRole('combobox', { name: 'Model' }).fill(model);
    await this.page.getByRole('option').first().click();
  }

  /**
   * @param {Template} template
   * @param {number} index
   */
  async addTemplate(template, index) {
    if (index > 0) {
      await this.page.getByRole('button', { name: 'Add Template' }).click();
    }

    // Toggle Active checkbox safely (scoped)
    const templateScope = this.page.locator(`div:has-text("Service Name")`).nth(index);

    const activeCheckbox = templateScope.getByRole('checkbox').first();
    if (template.isActive) {
      await activeCheckbox.check();
    } else {
      await activeCheckbox.uncheck();
    }

    // Fill basic details
    await this.page.getByRole('textbox', { name: 'Service Name' }).nth(index).fill(template.serviceName);
    await this.page.getByRole('textbox', { name: 'Period (In Days)' }).nth(index).fill(String(template.periodDays));
    await this.page.getByRole('textbox', { name: 'Primary Reading' }).nth(index).fill(String(template.primaryReading));
    await this.page.getByRole('textbox', { name: 'Secondary Meter Reading' }).nth(index).fill(String(template.secondaryReading));

    // Add Tasks
    for (const task of template.tasks) {
      await this.addTask(task, index);
    }

    // Alert (only once per template)
    await this.fillAlert(template.alert, index);
  }

  /**
   * @param {Task} task
   * @param {number} templateIndex
   */
  async addTask(task, templateIndex) {
    await this.page.getByRole('combobox', { name: 'Select task' }).nth(templateIndex).click();
    await this.page.getByRole('option', { name: task.taskName }).click();

    await this.page.getByRole('combobox', { name: 'Search Item Name/Code' }).nth(templateIndex).click();
    await this.page.getByRole('option', { name: new RegExp(task.itemName, 'i') }).click();

    await this.page.getByRole('textbox', { name: 'Quantity' }).nth(templateIndex).fill(String(task.quantity));

    await this.page.getByRole('button', { name: 'Add' }).nth(templateIndex).click();
  }

  /**
   * @param {Template['alert']} alert
   * @param {number} index
   */
  async fillAlert(alert, index) {
    await this.page.getByRole('textbox', { name: 'Day Before' }).nth(index).fill(String(alert.dayBefore));
    await this.page.getByRole('textbox', { name: 'Reading Before Alert' }).nth(index).fill(String(alert.readingBefore));
    await this.page.getByRole('textbox', { name: 'Secondary Reading Before Alert' }).nth(index).fill(String(alert.secondaryReadingBefore));
    await this.page.getByRole('textbox', { name: 'Alert Message' }).nth(index).fill(alert.message);
    await this.page.getByRole('textbox', { name: 'Remark' }).nth(index).fill(alert.remark);
  }

  async submit() {
    await this.saveButton.click();
    await expect(this.page.getByText(/success/i)).toBeVisible({ timeout: 15_000 });
  }
}

module.exports = { ServiceSchedulePage };
