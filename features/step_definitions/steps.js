const { Given, When, Then } = require('@cucumber/cucumber');

Given('a login to Ecommerce application with {username} and {password}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

// 2. When step to add an item to the cart
When('Add {string} to cart', async function (productName) {
    // Your code to search and add the product goes here
    console.log(`Adding product to cart: ${productName}`);
     return 'pending';
});

// 3. Then step to verify the product in the cart
Then('Verify {string} is displayed in the Cart', async function (productName) {
    // Your assertion code goes here
    console.log(`Verifying product in cart: ${productName}`);
     return 'pending';
});

// 4. When step for entering details and placing order
When('Enter valid details and Place the Order', async function () {
    // Your checkout flow code goes here
    console.log('Placing the order...');
     return 'pending';
});

// 5. Then step for order history validation
Then('Verfify order in present in the OrderHistory', async function () {
    // Your validation code goes here
    console.log('Checking order history...');
     return 'pending';
});