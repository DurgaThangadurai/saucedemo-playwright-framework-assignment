const { expect } = require('@playwright/test');
const { test } = require('../fixtures/loginFixture');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const orderData = require('../test-data/orderData');

test('user can complete one-product order @smoke @regression', async ({ loggedInPage }) => {
  const inventoryPage = new InventoryPage(loggedInPage);
  const cartPage = new CartPage(loggedInPage);
  const checkoutPage = new CheckoutPage(loggedInPage);

  await inventoryPage.expectLoaded();
  await inventoryPage.addProductByName(orderData.productName);

  await expect(loggedInPage.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await inventoryPage.openCart();
  await cartPage.expectItemCount(1);
  await cartPage.expectProduct(orderData.productName);
  await cartPage.checkout();

  await checkoutPage.enterCustomerDetails(orderData.customer);
  await checkoutPage.continueCheckout();
  await checkoutPage.expectSummaryProduct(orderData.productName);
  await checkoutPage.finishOrder();
  await checkoutPage.expectOrderCompleted();
});
