const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
// FIX 1: Import chromium directly from the package instead of 'playwright'
const { chromium } = require('@playwright/test'); 

Given('a login to Ecommerce application with {string} and {string}',  {timeout: 100 * 1000},async function (username, password) {

    const browser = await chromium.launch({ headless: false }); 
    const context = await browser.newContext();
    const page = await context.newPage();
    this.browser = browser; 
    this.poManager = new POManager(page);
    
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.ValidLogin(username, password);
});

When('Add {string} to cart', {timeout: 100 * 1000}, async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

// 3. Then step to verify the product in the cart
Then('Verify {string} is displayed in the Cart', {timeout: 100 * 1000}, async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

// 4. When step for entering details and placing order
When('Enter valid details and Place the Order', {timeout: 100 * 1000}, async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    
    // Save orderId to 'this' context so the next step can read it
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log('Placing the order... ID: ' + this.orderId);
});

// 5. Then step for order history validation
Then('Verify order in present in the OrderHistory', {timeout: 100 * 1000}, async function () {
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    
    // Read orderId from context
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    
    const historyId = await ordersHistoryPage.getOrderId();
    expect(this.orderId.includes(historyId)).toBeTruthy();
    console.log('Checking order history completed successfully.');
    
    // Clean closure: Close browser at the end of the scenario
    await this.browser.close();
});