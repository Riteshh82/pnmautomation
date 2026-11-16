const { test, expect } = require('../../../fixtures/base.fixture');
const { TaskPage } = require('../../../pages/TaskPage');
const { NavbarPage } = require('../../../pages/NavbarPage');

/**
 * Task Master — End-to-End Tests
 *
 * Pre-condition: the `storePage` fixture handles login + site selection,
 * so every test here starts already inside the P&M Master site dashboard.
 *
 * Tags:
 *   @smoke      — critical happy path
 *   @positive   — happy-path scenarios
 */

test.describe('Task Master', () => {

  test('@smoke @positive TC-T-01: Task menu item opens the list', async ({ PnMPage: page }) => {
    const navbar = new NavbarPage(page);
    const task = new TaskPage(page);
    await navbar.goToTask();
    await task.openAddForm();
    await task.fillAndSubmit('mobil diesel oilll', 'Take action', true);
    await task.expectSuccess();
  });

});
