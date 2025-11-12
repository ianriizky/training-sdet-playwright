import { test } from '@playwright/test';

import { CartPage } from '@/resources/pages/saucedemo/cart.page';
import { CheckoutOverviewPage } from '@/resources/pages/saucedemo/checkout-overview.page';
import { CheckoutPage } from '@/resources/pages/saucedemo/checkout.page';
import { InventoryPage } from '@/resources/pages/saucedemo/inventory.page';
import { LoginPage } from '@/resources/pages/saucedemo/login.page';
import { OrderConfirmationPage } from '@/resources/pages/saucedemo/order-confirmation.page';
import { cartSelector } from '@/resources/selectors/saucedemo/cart.selector';
import { checkoutOverviewSelector } from '@/resources/selectors/saucedemo/checkout-overview.selector';
import { checkoutSelector } from '@/resources/selectors/saucedemo/checkout.selector';
import { inventorySelector } from '@/resources/selectors/saucedemo/inventory.selector';
import { loginSelector } from '@/resources/selectors/saucedemo/login.selector';
import { orderConfirmationSelector } from '@/resources/selectors/saucedemo/order-confirmation.selector';
import { selectItemsTestData } from '@/resources/test-data/saucedemo/select-item.test-data';

selectItemsTestData.forEach((testData) => {
  test(`Full E2E Flow: ${testData.name}`, async ({ page }) => {
    const loginPage = new LoginPage(page, loginSelector);
    const inventoryPage = new InventoryPage(page, inventorySelector);
    const cartPage = new CartPage(page, cartSelector);
    const checkoutPage = new CheckoutPage(page, checkoutSelector);
    const checkoutOverviewPage = new CheckoutOverviewPage(
      page,
      checkoutOverviewSelector,
    );
    const orderConfirmationPage = new OrderConfirmationPage(
      page,
      orderConfirmationSelector,
    );

    await test.step('1. Login', async () => {
      await loginPage.navigateToHomePage();
      await loginPage.performValidLogin();
      await loginPage.assertHasInventoryPage();
    });

    await test.step('2. Browse / Filter Products', async () => {
      await inventoryPage.performSortByPriceLowHigh();
      await inventoryPage.assertItemsSortedByPriceLowHigh();
    });

    await test.step('3. Add Products to Cart', async () => {
      await inventoryPage.performAddSpecificItemsToCart(testData.itemIndices);
      await inventoryPage.assertCartBadgeCount(testData.itemIndices.length);
    });

    await test.step('4. View Cart', async () => {
      await inventoryPage.performOpenCart();
      await cartPage.assertHasCartPage();
      await cartPage.assertCartItemCount(testData.itemIndices.length);
    });

    await test.step('5. Checkout', async () => {
      await cartPage.performCheckout();
      await checkoutPage.assertHasCheckoutPage();
      await checkoutPage.performFillCheckoutForm();
      await checkoutPage.performClickContinue();
      await checkoutPage.assertHasCheckoutOverviewPage();
    });

    await test.step('6. Review Order', async () => {
      await checkoutOverviewPage.assertCartItemCount(
        testData.itemIndices.length,
      );
      await checkoutOverviewPage.performClickFinish();
      await checkoutOverviewPage.assertHasOrderConfirmationPage();
    });

    await test.step('7. Order Confirmation', async () => {
      await orderConfirmationPage.assertHasConfirmationMessage();
    });

    await test.step('8. Logout', async () => {
      await loginPage.performClickLogoutButton();
      await loginPage.assertHasHomePage();
    });
  });
});
