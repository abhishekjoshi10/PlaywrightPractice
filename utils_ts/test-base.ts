
import { test as baseTest } from '@playwright/test';
interface   testDataForOrder {
        username: String;
        password: String;
        productName: String;
    }
// Extend the base test runner to inject your custom data fixture
export const customtest = baseTest.extend<{testDataForOrder:testDataForOrder

}>({
    testDataForOrder: {
        username: "anshika@gmail.com",
        password: "Iamking@000",
        productName: "ZARA COAT 3"
    }
});

// Export both customtest and expect so your test scripts only need one import
module.exports = { customtest, expect: baseTest.expect };