## Writing good BDD scenarios
### Use one perspective only
Imperative to use one perspective only throughout the test suite and the use of third person seems a bit less ambiguous (see https://automationpanda.com/2017/01/18/should-gherkin-steps-use-first-person-or-third-person/).

### One scenario covers one behavior
If the behaviours are defined by the team, the behaviours will just be used as is. But if testers are deriving the behaviours from requirements in some other form, we should try to base behaviours on user needs/stories. For example, imagine the requirements
- users should be able to wishlist a property listed on the homepage
    - when no wishlists exist - the user is asked to create a wishlist to add the property to
    - when wishlists exist - the user is asked whether to add the property to an existing wishlist or create a new wishlist 
The following scenario could be created.
```
    Scenario: Wish-listing a property when no wishlists exist
        Given the user is on the homepage and has no wishlists
        When the user attempts to wishlist a property
        Then the "Create wishlist" modal is shown
```
This is quite a low-level scenario and only captures part of the user story. Instead we could use the following scenario.
```
    Scenario: Wish-listing a property when no wishlists exist
        Given the user is on the homepage and has no wishlists
        When the user adds a property to a new wishlist "My favourite places"
        Then the new property is visible in the wishlist "My favourite places"
```
Now we have a scenario that is more likely to cover a complete user story - the `"Create wishlist" modal is shown` will be implicitly covered by the scenario and doesn't need to be called out in the scenario definition (though we could have a separate component test that does explicitly test this). A second scenario covering the "when wishlists exist" could be created.

## How to use BDD with the Page Object Model
A simple example of (Playwright) Page Object Model (POM) calls might be the following, with each call being a function in a different page class.
```
await helpers.deleteAllWishlists();

await signinPage.signin();
await homepage.addPropertyToWishlist("Sunny cottage in Cornwall", "My favourite places"); // includes the creation of the new wishlist
await homepage.navigateTo("My Wishlists");
await wishlistsPage.checkItemExists("Sunny cottage in Cornwall", "My favourite places")
```
In order to apply the statements in a BDD scenario directly to these calls, we have two options:
1. have a separate statement in our scenario for each function call. I.e. Our BDD scenario would look like the following
```
    Background: Setup
        Given the user is logged in

    Scenario: Wish-listing a property when no wishlists exist
        Given the user is on the homepage and has no wishlists
        When the user adds a property to a new wishlist "My favourite places"
        And the user navigates to the "My Wishlists" page
        Then the new property is visible in the wishlist "My favourite places"
```
2. implement a higher level function like `homepage.checkItemExistsInWishlist` which would navigate to the wishlist page and check the property exists in the specified wishlist.
3. implement the BDD steps outside of the POM. E.g.
```
Then('the new property is visible in the wishlist "My favourite places"', async ({ homepage, wishlistsPage }, name: string) => {
    await homepage.navigateTo("My Wishlists");
    await wishlistsPage.checkItemExists("Sunny cottage in Cornwall", "My favourite places")
});
```
I'm not sure the navigation step `And the user navigates to the "My Wishlists" page` is needed - it doesn't seem to add anything to scenario except for ease of implementing an automated test. So the example in `playwright-bdd` implements the 3rd option above.
