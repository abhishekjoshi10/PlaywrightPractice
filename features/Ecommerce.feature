Feature: Ecommerce validations

    Scenario: Placing the Order
        Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and Place the Order
        Then Verify order in present in the OrderHistory

# Feature Description