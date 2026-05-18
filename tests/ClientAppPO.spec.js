const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
// Simply import the JSON array directly
const datasets = require('../utils/placeOrderTestData.json');

// Loop through each dataset to generate independent test runs automatically
for (const data of datasets) {
  test(`Client App login for product: ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.ValidLogin(data.username, data.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}

 customtest(`Client App login for product:`, async ({ page,testDataForOrder }) => {
    const poManager = new POManager(page);
    
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.ValidLogin(testDataForOrder.username, testDataForOrder.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });