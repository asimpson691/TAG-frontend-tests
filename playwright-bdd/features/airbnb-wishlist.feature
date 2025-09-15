Feature: AirBnB Wishlist

    Background:
        Given the user is logged in and has accepted cookies

    Scenario: Wish-listing a property when no wishlists exist
        Given the user is on the homepage and has no wishlists
        When the user adds a property to a new wishlist "My favourite places"
        Then the new property is visible in the wishlist "My favourite places"
