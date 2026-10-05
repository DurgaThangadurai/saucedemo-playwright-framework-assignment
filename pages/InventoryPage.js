const { expect } = require('@playwright/test');

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async expectLoaded() {
    await expect(this.inventoryContainer).toBeVisible();
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async addProductByName(productName) {
    const productCard = this.inventoryItems.filter({ hasText: productName }).first();
    await expect(productCard).toBeVisible();
    await productCard.getByRole('button', { name: /add to cart/i }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}


