const { test: base, expect } = require('@playwright/test');
const { AUTH, SITE } = require('../test-data');

async function performLogin(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { name: 'Inventory Management' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Employee Code' }).fill(AUTH.EMPLOYEE_ID);
  await page.getByRole('textbox', { name: 'Password' }).fill(AUTH.PASSWORD);

  await Promise.all([
    page.waitForURL(url => !url.pathname.endsWith('/') || url.search.length > 0, { timeout: 30_000 }),
    page.getByRole('button', { name: 'Sign In' }).click(),
  ]);

  await page.waitForLoadState('networkidle');
}

const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await performLogin(page);
    await use(page);
  },

  PnMPage: async ({ page }, use) => {
    await performLogin(page);

    // Wait for the module picker to be visible and click the P&M Master card
    await page.getByRole('heading', { name: 'P&M Master' }).click();

    await page.getByRole('button', { name: 'Access' }).nth(3).click();

    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('banner')).toContainText(
      `Site: ${SITE.DEMO_SITE}`,
      { timeout: 15_000 }
    );

    await use(page);
  },
});

module.exports = { test, expect };
