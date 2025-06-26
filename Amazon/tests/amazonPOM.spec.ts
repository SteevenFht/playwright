import { test, expect } from '@playwright/test';
import { HomePage } from '../pom/HomePage.page';
import { SearchResultsPage } from '../pom/SearchResultsPage.page';
import { ProductPage } from '../pom/ProductPage.page';
import { CartPage } from '../pom/CartPage.page';


// test('Search for a "ballon de basket" and order the first model found on Amazon', async ({ page }) => {  
//     const homePage = new HomePage(page);
//     const searchResultsPage = new SearchResultsPage(page);
//     const productPage = new ProductPage(page);
//     const cartPage = new CartPage(page);

//     await homePage.navigateToAmazon();
//     await homePage.acceptCookies();
//     await homePage.searchProduct('ballon de basket');
//     await searchResultsPage.selectFirstProduct();
//     await productPage.addToCart();
//     await productPage.goToCart();
//     await cartPage.proceedToCheckout();
// });
 
// All tests are for amazon.fr
 
// Test case 1 : Verify navigation to amazon.fr
// Step 1: Open the browser and navigate to the amazon.fr 
// Expected Result: Verify that the current URL is amazon.fr
test('@smoke Verify navigation to amazon.fr', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigateToAmazon();
    // Verify that the current URL is amazon.fr
    expect(page.url()).toBe('https://www.amazon.fr/');
});

// Test case 2 : Verify cookie acceptance
// Step 1: Open the browser and navigate to the amazon.fr
// Step 2: Accept cookies
// Expected Result: Verify that the cookies are accepted (the button disappears after the click)
test('@smoke Verify cookie acceptance', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigateToAmazon();
    await homePage.acceptCookies();
    // Verify that the cookie acceptance button is no longer visible
    const cookieButton = page.locator('text=Accepter');
    expect(await cookieButton.isVisible()).toBe(false);
});

// Test case 3 : Verify product search
// Step 1: Open the browser and navigate to the amazon.fr and Close the pop-up
// Step 2: Search for "ballon de basket"
// Expected Result: Verify that the search results are displayed
test('@smoke Verify product search', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigateToAmazon();
    await homePage.acceptCookies();
    await homePage.searchProduct('ballon de basket');
    // Verify that the search results are displayed
    await expect(await page.locator('.a-color-state')).toBeVisible();
});
 
// Test case 4 : Verify selection of the first product
// Step 1: Navigate to amazon.fr, perform the search
// Step 2: Select the first product
// Expected Result: Verify that the product page is displayed (e.g., check the product title element)
test('@smoke Verify selection of the first product', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productPage = new ProductPage(page);

    await homePage.navigateToAmazon();
    await homePage.acceptCookies();
    await homePage.searchProduct('ballon de basket');
    await searchResultsPage.selectFirstProduct();
    // Verify that the product page is displayed
    const productTitle = await productPage.getProductTitle();
    expect(productTitle).toBeTruthy(); // Check that the product title is not empty
});
 
// Test case 5 : Verify adding product to cart
// Step 1: Navigate to amazon.fr, perform the search and select the product
// Step 2: Add to cart
// Expected Result: Verify that the product is added to the cart (e.g., check for a confirmation message)
test('Verify adding product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productPage = new ProductPage(page);

    await homePage.navigateToAmazon();
    await homePage.acceptCookies();
    await homePage.searchProduct('ballon de basket');
    await searchResultsPage.selectFirstProduct();
    await productPage.addToCart();
    // Verify that the product is added to the cart
    const confirmationMessage = await productPage.getConfirmationMessage();
    expect(confirmationMessage).not.toBeNull(); // Verify that the confirmation message is not null
});
 
// Test case 6 : Verify accessing the cart
// Step 1: Navigate to amazon.fr, perform the search and add the product to the cart
// Step 2: Go to the cart
// Expected Result: Verify that the product is present in the cart
test('Verify accessing the cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateToAmazon();
    await homePage.acceptCookies();
    await homePage.searchProduct('ballon de basket');
    await searchResultsPage.selectFirstProduct();
    await productPage.addToCart();
    await productPage.goToCart();
    // Verify that the product is present in the cart
    const cartItem = await cartPage.getfirstCartItemTitle();
    await expect(cartItem).not.toBeNull(); // Verify that the cart item is not null
});
 
// Test case 7 : Verify the checkout process
// Step 1: Navigate to amazon.fr, perform the search, add the product to the cart and go to the cart
// Step 2: Proceed to checkout
// Expected Result: Verify that the checkout process is initiated (e.g., check for the presence of the checkout page)
test('Verify the checkout process', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.navigateToAmazon();
    await homePage.acceptCookies();
    await homePage.searchProduct('ballon de basket');
    await searchResultsPage.selectFirstProduct();
    await productPage.addToCart();
    await productPage.goToCart();
    await cartPage.proceedToCheckout();
    // Verify that the checkout process is initiated by checking for the presence of the email input field
    const emailInput = page.locator('input#ap_email');
    await expect(emailInput).toBeVisible();
});
