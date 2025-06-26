const { test, expect } = require('@playwright/test');
 
test('Search for a pair of sneakers and order the first model found on Amazon', async ({ page }) => {  
  await page.goto('https://www.amazon.fr');
  
  // close the pop up
  await page.getByLabel('Accepter').click();
  // Enter the search term
  await page.getByPlaceholder('Rechercher Amazon.fr').fill('baskets');
  // Click on the search button
  await page.getByRole('button', { name: 'Go' }).click();
  
});
 
// All tests are for amazon.fr
 
// Test case 1 : Verify navigation to amazon.fr
// Step 1: Open the browser and navigate to the amazon.fr 
// Expected Result: Verify that the current URL is amazon.fr
test('Verify navigation to amazon.fr', async ({ page }) => {
  await page.goto('https://www.amazon.fr');
  // Verify that the current URL is amazon.fr
  expect(page.url()).toBe('https://www.amazon.fr/');
});

// Test case 2 : Verify cookie acceptance
// Step 1: Open the browser and navigate to the amazon.fr
// Step 2: Accept cookies
// Expected Result: Verify that the cookies are accepted (the button disappears after the click)
 test('Verify cookie acceptance', async ({ page }) => {
  await page.goto('https://www.amazon.fr');
  // Accept cookies
  await page.getByLabel('Accepter').click();
  // Verify that the cookie acceptance button is no longer visible
  const cookieButton = page.getByLabel('Accepter');
  expect(await cookieButton.isVisible()).toBe(false);
});

// Test case 3 : Verify product search
// Step 1: Open the browser and navigate to the amazon.fr and Close the pop-up
// Step 2: Search for "sneakers"
// Expected Result: Verify that the search results are displayed
test('Verify product search', async ({ page }) => {
  await page.goto('https://www.amazon.fr');
  // Close the pop-up
  await page.getByLabel('Accepter').click();
  // Enter the search term
  await page.getByPlaceholder('Rechercher Amazon.fr').fill('baskets');
  // Click on the search button
  await page.getByRole('button', { name: 'Go' }).click();
  // Verify that the search results are displayed
  const searchResults = await page.getByRole('heading', { name: 'Résultats de recherche pour "baskets"' });
  expect(await searchResults.isVisible()).toBe(true);
});
 
// Test case 4 : Verify selection of the first product
// Step 1: Navigate to amazon.fr, perform the search
// Step 2: Select the first product
// Expected Result: Verify that the product page is displayed (e.g., check the product title element)
test('Verify selection of the first product', async ({ page }) => {
  await page.goto('https://www.amazon.fr');
  // Close the pop-up
  await page.getByLabel('Accepter').click();
  // Enter the search term
  await page.getByPlaceholder('Rechercher Amazon.fr').fill('baskets');
  // Click on the search button
  await page.getByRole('button', { name: 'Go' }).click();
  // Select the first product
  const firstProduct = page.getByRole('link', { name: 'Voir le produit' }).first();
  await firstProduct.click();
  // Verify that the product page is displayed
  const productTitle = await page.getByRole('heading', { name: 'Titre du produit' });
  expect(await productTitle.isVisible()).toBe(true);
});
 
// Test case 5 : Verify adding product to cart
// Step 1: Navigate to amazon.fr, perform the search and select the product
// Step 2: Add to cart
// Expected Result: Verify that the product is added to the cart (e.g., check for a confirmation message)
test('Verify adding product to cart', async ({ page }) => {
  await page.goto('https://www.amazon.fr');
  // Close the pop-up
  await page.getByLabel('Accepter').click();
  // Enter the search term
  await page.getByPlaceholder('Rechercher Amazon.fr').fill('baskets');
  // Click on the search button
  await page.getByRole('button', { name: 'Go' }).click();
  // Select the first product
  const firstProduct = page.getByRole('link', { name: 'Voir le produit' }).first();
  await firstProduct.click();
  // Add to cart
  await page.getByRole('button', { name: 'Ajouter au panier' }).click();
  // Verify that the product is added to the cart
  const confirmationMessage = await page.getByText('Produit ajouté au panier');
  expect(await confirmationMessage.isVisible()).toBe(true);
});
 
// Test case 6 : Verify accessing the cart
// Step 1: Navigate to amazon.fr, perform the search and add the product to the cart
// Step 2: Go to the cart
// Expected Result: Verify that the product is present in the cart
test('Verify accessing the cart', async ({ page }) => {
  await page.goto('https://www.amazon.fr');
  // Close the pop-up
  await page.getByLabel('Accepter').click();
  // Enter the search term
  await page.getByPlaceholder('Rechercher Amazon.fr').fill('baskets');
  // Click on the search button
  await page.getByRole('button', { name: 'Go' }).click();
  // Select the first product
  const firstProduct = page.getByRole('link', { name: 'Voir le produit' }).first();
  await firstProduct.click();
  // Add to cart
  await page.getByRole('button', { name: 'Ajouter au panier' }).click();
  // Go to the cart
  await page.getByRole('link', { name: 'Panier' }).click();
  // Verify that the product is present in the cart
  const cartProduct = await page.getByRole('heading', { name: 'Titre du produit' });
  expect(await cartProduct.isVisible()).toBe(true);
});
 
// Test case 7 : Verify the checkout process
// Step 1: Navigate to amazon.fr, perform the search, add the product to the cart and go to the cart
// Step 2: Proceed to checkout
// Expected Result: Verify that the checkout process is initiated (e.g., check for the presence of the checkout page)
test('Verify the checkout process', async ({ page }) => {
  await page.goto('https://www.amazon.fr');
  // Close the pop-up
  await page.getByLabel('Accepter').click();
  // Enter the search term
  await page.getByPlaceholder('Rechercher Amazon.fr').fill('baskets');
  // Click on the search button
  await page.getByRole('button', { name: 'Go' }).click();
  // Select the first product
  const firstProduct = page.getByRole('link', { name: 'Voir le produit' }).first();
  await firstProduct.click();
  // Add to cart
  await page.getByRole('button', { name: 'Ajouter au panier' }).click();
  // Go to the cart
  await page.getByRole('link', { name: 'Panier' }).click();
  // Proceed to checkout
  await page.getByRole('button', { name: 'Passer la commande' }).click();
  // Verify that the checkout process is initiated
  const checkoutPage = await page.getByRole('heading', { name: 'Passer la commande' });
  expect(await checkoutPage.isVisible()).toBe(true);
}
);