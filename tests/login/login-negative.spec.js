const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { AUTH } = require('../../test-data');

/**
 * Login Module — Negative Test Cases
 *
 * Tags:
 *   @negative — negative flow filter
 *   @login    — module scope
 */

test.describe('Login Module — Negative Scenarios', () => {

  test('@negative TC-LOG-NEG-01: Login with invalid password displays error or remains on login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.attemptLogin(AUTH.EMPLOYEE_ID, AUTH.WRONG_PASSWORD);

    // Assert that user is NOT logged in and remains on the login screen
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn, 'User should not be logged in with wrong password').toBe(false);
  });

  test('@negative TC-LOG-NEG-02: Login with non-existent Employee ID fails', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.attemptLogin(AUTH.WRONG_EMPLOYEE_ID, AUTH.PASSWORD);

    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn, 'User should not be logged in with invalid Employee ID').toBe(false);
  });

  test('@negative TC-LOG-NEG-03: Login with empty Employee ID and empty Password does not submit', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.attemptLogin('', '');

    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn, 'User should not be logged in with empty credentials').toBe(false);
  });

  test('@negative TC-LOG-NEG-04: Login with valid Employee ID but empty Password fails', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.attemptLogin(AUTH.EMPLOYEE_ID, '');

    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn, 'User should not be logged in with empty password').toBe(false);
  });

});
