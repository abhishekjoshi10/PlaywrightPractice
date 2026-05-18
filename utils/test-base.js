const base = require('@playwright/test');

// Extend the base test runner to inject your custom data fixture
const customtest = base.test.extend({
    testDataForOrder: {
        username: "anshika@gmail.com",
        password: "Iamking@000",
        productName: "ZARA COAT 3"
    }
});

// Export both customtest and expect so your test scripts only need one import
module.exports = { customtest, expect: base.expect };