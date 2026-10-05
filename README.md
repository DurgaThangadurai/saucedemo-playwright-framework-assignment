# SauceDemo Playwright Automation Framework

A scalable and maintainable UI automation framework built using **JavaScript, Playwright Test, and Page Object Model (POM)** for the SauceDemo application.

The framework demonstrates cross-browser execution, parallel test execution, authentication through a custom Playwright fixture, reporting, diagnostics, and clean separation between test data, page objects, and business scenarios.

## Technology Stack

- JavaScript
- Node.js
- Playwright Test
- Page Object Model (POM)
- Chromium
- Firefox
- Allure Reporting
- GitHub Actions

## Framework Architecture

```text
saucedemo-playwright-framework/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── config/
│   └── env.js
│
├── fixtures/
│   └── loginFixture.js
│
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── test-data/
│   ├── users.js
│   └── orderData.js
│
├── tests/
│   ├── login.spec.js
│   └── order.spec.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md

Architecture Principles:

Page Object Model
Page objects encapsulate:
- Locators
- Page-level interactions
- Reusable UI operations
Tests remain focused on business scenarios and validations.

Login-Only Custom Fixture
The custom Playwright fixture is intentionally limited to authentication.
loginFixture.js
       │
       ▼
Authentication
       │
       ▼
loggedInPage
       │
       ├── InventoryPage
       ├── CartPage
       └── CheckoutPage

InventoryPage, CartPage, and CheckoutPage are not registered as fixtures.

They are instantiated directly within the business-flow tests using the authenticated Playwright page.

This keeps the fixture layer focused on test setup while keeping application behavior within the Page Object Model.

Test Scenarios

Authentication
- Valid user login
- Invalid username/password
- Locked-out user validation

End-to-End Order Flow
- Login
- Add exactly one product to the cart
- Validate cart contents
- Proceed to checkout
- Enter customer information
- Complete the order
- Validate successful order completion

Browser Coverage
The test suite is configured to execute against:
- Chromium
- Firefox

The same test scenarios are executed across supported browser projects.

Parallel Execution
Playwright parallel execution is enabled through the Playwright configuration.
This allows independent tests to execute concurrently and improves execution efficiency.