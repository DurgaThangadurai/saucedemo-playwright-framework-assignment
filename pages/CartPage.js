const { expect } = require('@playwright/test');

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectItemCount(count) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async expectProduct(productName) {
    await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}


