import { test } from '@playwright/test';

import { InventoryPage } from '@/resources/pages/saucedemo/inventory.page';
import { LoginPage } from '@/resources/pages/saucedemo/login.page';
import { generateRandomNumber } from '@/resources/utils';

test.describe('SauceDemo - Inventory', { tag: '@saucedemo' }, () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.navigateToHomePage();
    await loginPage.performValidLogin();
  });

  test('Sort items as Name A-Z and verify the item is sorted properly', async () => {
    await inventoryPage.performSortByNameAZ();
    await inventoryPage.assertItemsSortedByNameAZ();
  });

  test('Sort items as Name Z-A and verify the item is sorted properly', async () => {
    await inventoryPage.performSortByNameZA();
    await inventoryPage.assertItemsSortedByNameZA();
  });

  test('Sort items as Price Low-High and verify the item is sorted properly', async () => {
    await inventoryPage.performSortByPriceLowHigh();
    await inventoryPage.assertItemsSortedByPriceLowHigh();
  });

  test('Sort items as Price High-Low and verify the item is sorted properly', async () => {
    await inventoryPage.performSortByPriceHighLow();
    await inventoryPage.assertItemsSortedByPriceHighLow();
  });

  test('Select random item (2-6) Add to Cart and verify the cart shows correct badge number and the item exist when Cart is opened', async () => {
    const randomCount = generateRandomNumber(2, 6);

    await inventoryPage.performAddRandomItemsToCart(randomCount);
    await inventoryPage.assertCartBadgeCount(randomCount);

    await inventoryPage.performOpenCart();
    await inventoryPage.assertCartItemCount(randomCount);
  });

  test('Remove 1 item from cart and verify the cart shows correct badge number and the item exist when Cart is opened', async () => {
    await inventoryPage.performAddSpecificItemsToCart([0, 1]);
    await inventoryPage.performOpenCart();
    await inventoryPage.performRemoveItemFromCart(0);

    await inventoryPage.assertCartBadgeCount(1);
    await inventoryPage.assertCartItemCount(1);
  });

  test('Remove all items from cart and verify the cart is empty', async () => {
    await inventoryPage.performAddSpecificItemsToCart([0, 1]);
    await inventoryPage.performOpenCart();
    await inventoryPage.performRemoveAllItemsFromCart();

    await inventoryPage.assertCartEmpty();
  });
});
