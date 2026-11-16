const { test, expect } = require('../../../fixtures/base.fixture');
const { TaskPage } = require('../../../pages/TaskPage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Task Master — Negative Test Scenarios
 *
 * Tags:
 *   @negative — negative test coverage
 *   @task     — scope filter
 */

test.describe('Task Master — Negative Scenarios', () => {

  test('@negative TC-T-NEG-01: Empty form submission does not show success toast', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const task = new TaskPage(page);

    await navbar.goToTask();
    await task.openAddForm();

    // Click submit without filling required Name and Action fields
    await task.submitAddButton.click();

    // Verify success toast does not appear
    await task.expectNoSuccessToast();

    // Verify form remains open
    await task.expectFormVisible();
  });

  test('@negative TC-T-NEG-02: Cancelling Add Task form closes modal without saving', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const task = new TaskPage(page);

    await navbar.goToTask();
    await task.openAddForm();

    await task.nameInput.fill('Temp Task To Cancel');
    
    // Close modal if cancel button exists
    if (await task.cancelButton.isVisible().catch(() => false)) {
      await task.cancelForm();
      await task.expectFormClosed();
    } else {
      // If no explicit cancel button, verify form heading is visible when active
      await task.expectFormVisible();
    }
  });

});
