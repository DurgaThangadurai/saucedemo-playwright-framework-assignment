const { expect } = require('@playwright/test');

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.summaryItems = page.locator('[data-test="inventory-item-name"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async enterCustomerDetails(customer) {
    await this.firstName.fill(customer.firstName);
    await this.lastName.fill(customer.lastName);
    await this.postalCode.fill(customer.postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async expectSummaryProduct(productName) {
    await expect(this.summaryItems.filter({ hasText: productName })).toBeVisible();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async expectOrderCompleted() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}


