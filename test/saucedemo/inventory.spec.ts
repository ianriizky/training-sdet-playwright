import { expect, test } from '@playwright/test';

import { acceptedPasswords, acceptedUsernames } from './constant';

test.describe('SauceDemo - Inventory', () => {
  test.use({ baseURL: 'https://www.saucedemo.com' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    await test.step('Fill in credentials', async () => {
      await page.locator('[data-test="username"]').fill(acceptedUsernames[0]);
      await page.locator('[data-test="password"]').fill(acceptedPasswords[0]);
    });

    await test.step('Click login button', async () => {
      await page.locator('[data-test="login-button"]').click();
    });
  });

  test('Sort items as Name A-Z and verify the item is sorted properly', async ({
    page,
  }) => {
    await test.step('Click sort by name A-Z', async () => {
      await page
        .locator('[data-test="product-sort-container"]')
        .selectOption('az');
    });

    const itemNames = await page
      .locator('[data-test="inventory-item-name"]')
      .allTextContents();
    const sortedNames = [...itemNames].sort();

    expect(itemNames).toEqual(sortedNames);
  });

  test('Sort items as Name Z-A and verify the item is sorted properly', async ({
    page,
  }) => {
    await test.step('Click sort by name Z-A', async () => {
      await page
        .locator('[data-test="product-sort-container"]')
        .selectOption('za');
    });

    const itemNames = await page
      .locator('[data-test="inventory-item-name"]')
      .allTextContents();
    const sortedNames = [...itemNames].sort().reverse();

    expect(itemNames).toEqual(sortedNames);
  });

  test('Sort items as Price Low-High and verify the item is sorted properly', async ({
    page,
  }) => {
    await test.step('Click sort by price low-high', async () => {
      await page
        .locator('[data-test="product-sort-container"]')
        .selectOption('lohi');
    });

    const itemPrices = await page
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();
    const prices = itemPrices.map((price) =>
      parseFloat(price.replace('$', '')),
    );
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test('Sort items as Price High-Low and verify the item is sorted properly', async ({
    page,
  }) => {
    await test.step('Click sort by price high-low', async () => {
      await page
        .locator('[data-test="product-sort-container"]')
        .selectOption('hilo');
    });

    const itemPrices = await page
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();
    const prices = itemPrices.map((price) =>
      parseFloat(price.replace('$', '')),
    );
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  });

  test('Select random item (2-6) Add to Cart and verify the cart shows correct badge number and the item exist when Cart is opened', async ({
    page,
  }) => {
    const randomCount = Math.floor(Math.random() * (6 - 2 + 1)) + 2;

    await test.step('Select random item (2-6) Add to Cart', async () => {
      const addToCartButtons = page.locator('[data-test^="add-to-cart"]');
      const totalButtons = await addToCartButtons.count();

      const selectedIndices = new Set<number>();
      while (selectedIndices.size < Math.min(randomCount, totalButtons)) {
        selectedIndices.add(Math.floor(Math.random() * totalButtons));
      }

      for (const index of selectedIndices) {
        await addToCartButtons.nth(index).click();
      }
    });

    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toContainText(randomCount.toString());

    await test.step('Open Cart', async () => {
      await page.locator('[data-test="shopping-cart-link"]').click();
    });

    const numberOfCartItem = await page
      .locator('[data-test="inventory-item"]')
      .count();
    expect(numberOfCartItem).toBe(randomCount);
  });

  test('Remove 1 item from cart and verify the cart shows correct badge number and the item exist when Cart is opened', async ({
    page,
  }) => {
    await test.step('Add 2 items to cart', async () => {
      await page.locator('[data-test^="add-to-cart"]').nth(0).click();
      await page.locator('[data-test^="add-to-cart"]').nth(1).click();
    });

    await test.step('Open Cart', async () => {
      await page.locator('[data-test="shopping-cart-link"]').click();
    });

    await test.step('Remove 1 item from cart', async () => {
      const removeButtons = page.locator('[data-test^="remove-"]');
      await removeButtons.first().click();
    });

    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toContainText('1');

    const numberOfCartItem = await page
      .locator('[data-test="inventory-item"]')
      .count();
    expect(numberOfCartItem).toBe(1);
  });

  test('Remove all items from cart and verify the cart is empty', async ({
    page,
  }) => {
    await test.step('Add 2 items to cart', async () => {
      await page.locator('[data-test^="add-to-cart"]').nth(0).click();
      await page.locator('[data-test^="add-to-cart"]').nth(1).click();
    });

    await test.step('Open Cart', async () => {
      await page.locator('[data-test="shopping-cart-link"]').click();
    });

    await test.step('Remove all items from cart', async () => {
      const removeButtons = page.locator('[data-test^="remove-"]');
      const removeCount = await removeButtons.count();

      for (let i = 0; i < removeCount; i++) {
        await page.locator('[data-test^="remove-"]').first().click();
      }
    });

    const numberOfCartItem = await page
      .locator('[data-test="inventory-item"]')
      .count();
    expect(numberOfCartItem).toBe(0);

    const emptyMessage = page.locator('.cart_contents_container');
    await expect(emptyMessage).toContainText('Continue Shopping');
  });
});
