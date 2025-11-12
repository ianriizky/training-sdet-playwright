import test, { expect, type Page } from '@playwright/test';

import { CartLocator } from '@/resources/locators/saucedemo/cart.locator';
import { type CartSelector } from '@/resources/selectors/saucedemo/cart.selector';

import { AbstractPage } from './abstract.page';

export class CartPage extends AbstractPage<CartLocator> {
  constructor(
    protected override readonly page: Page,
    protected readonly selector: CartSelector,
  ) {
    super(page, new CartLocator(page, selector));
  }

  async performRemoveItemFromCart(index: number): Promise<void> {
    const removeButtons = await this.locator.collectRemoveButtons();

    test.skip(
      index > removeButtons.length - 1,
      `Not enough items to remove from cart. Expected ${index}, but only ${removeButtons.length} available.`,
    );

    await test.step(`Remove item at index ${index} from cart`, async () => {
      await removeButtons[index]!.click();
    });
  }

  async performRemoveAllItemsFromCart(): Promise<void> {
    await test.step('Remove all items from cart', async () => {
      const removeButtons = await this.locator.removeButtons.all();

      for (const removeButton of removeButtons) {
        await removeButton.click();
      }
    });
  }

  async performContinueShopping(): Promise<void> {
    await test.step('Click continue shopping', async () => {
      await this.locator.continueShoppingButton.click();
    });
  }

  async performCheckout(): Promise<void> {
    await test.step('Click checkout', async () => {
      await this.locator.checkoutButton.click();
    });
  }

  async assertCartItemCount(expectedCount: number): Promise<void> {
    await test.step(`Assert cart has ${expectedCount} items`, async () => {
      const count = await this.locator.cartItems.count();
      expect(count).toBe(expectedCount);
    });
  }

  async assertCartItemsPresent(itemNames: string[]): Promise<void> {
    await test.step(`Assert cart contains items: ${itemNames.join(', ')}`, async () => {
      const cartItemNames = await this.locator.cartItemNames.allTextContents();

      for (const itemName of itemNames) {
        expect(cartItemNames).toContain(itemName);
      }
    });
  }

  async assertHasCheckoutPage(): Promise<void> {
    await expect(this.page).toHaveURL(
      new RegExp(`${this.config.baseURL}/checkout-step-one(\\.html)?$`),
    );
  }

  async assertHasCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(
      new RegExp(`${this.config.baseURL}/cart(\\.html)?$`),
    );
  }
}
