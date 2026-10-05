const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const users = require('../test-data/users');

test('valid user can login @smoke @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.validUser.username, users.validUser.password);

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('invalid credentials show the correct error @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.invalidUser.username, users.invalidUser.password);

  await loginPage.expectErrorContaining('Username and password do not match any user in this service');
});

test('locked user shows the locked error @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.lockedUser.username, users.lockedUser.password);

  await loginPage.expectErrorContaining('Sorry, this user has been locked out.');
});

test('empty username shows validation error @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('', users.validUser.password);

  await loginPage.expectErrorContaining('Username is required');
});

test('empty password shows validation error @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.validUser.username, '');

  await loginPage.expectErrorContaining('Password is required');
});
