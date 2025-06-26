import { test, expect } from '@playwright/test';
import { LogInPage } from '../pom/login.page';
import { ProductPage } from '../pom/product.page';
import { CartPage } from '../pom/cart.page';
import { CheckoutPage } from '../pom/checkout.page';

test('login', async ({ page }) => {

  const login = new LogInPage(page);
  // connexion
  await page.goto('https://www.saucedemo.com/');
  await login.login("standard_user","secret_sauce");
  // check if a product is present
  await expect(page.getByTestId('item-4-img-link')).toBeVisible();
});

test('filter', async({ page }) => {

  const login = new LogInPage(page);
  const product = new ProductPage(page);

  // connexion
  await page.goto('https://www.saucedemo.com/');
  await login.login("standard_user","secret_sauce");
  // check if a product is present
  await expect(page.getByTestId('item-4-img-link')).toBeVisible();
  
  // choose filter
  await product.filter("hilo");
  // check filter with the most expensive
  expect (await product.getNthProductName(0)).toBe('Sauce Labs Fleece Jacket');
});

test('checkout', async({ page }) => {

  const login = new LogInPage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  // connexion
  await page.goto('https://www.saucedemo.com/');
  await login.login("standard_user","secret_sauce");

  // check if a product is present
  await expect(page.getByTestId('item-4-img-link')).toBeVisible();
  
  // choose filter
  await product.filter("hilo");

  // check filter with the most expensive
  expect (await product.getNthProductName(0)).toBe('Sauce Labs Fleece Jacket');
  const first = await product.getNthProductName(0);
  const second = await product.getNthProductName(1);

  // add to cart the 2 most expensive
  await product.addNthProductCart(0);
  await product.addNthProductCart(1);

  // go to cart
  cart.goToCart();

  // check product in cart
  expect(await cart.getNthProductNameCart(0)).toBe(first);
  expect(await cart.getNthProductNameCart(1)).toBe(second);

  // go to checkout
  checkout.goToCheckout();
  checkout.fillForm();
  checkout.continueCheckout();

  // check finished checkout
  await expect(page.getByTestId('title')).toHaveText('Checkout: Overview')

  await page.getByTestId('finish').click()
});