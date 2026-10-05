const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const users = require('../test-data/users');

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);

    await expect(page).toHaveURL(/inventory\.html/);

    await use(page);
    
  }
});


