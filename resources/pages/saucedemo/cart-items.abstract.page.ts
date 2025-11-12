import test, { expect } from '@playwright/test';

import type { CartItemsAbstractLocator } from '@/resources/locators/saucedemo/cart-items.abstract-locator';

import { AbstractPage } from './abstract.page';

export abstract class CartItemsAbstractPage<
  TLocator extends CartItemsAbstractLocator,
> extends AbstractPage<TLocator> {
  async assertCartItemCount(expectedCount: number): Promise<void> {
    await test.step(`Assert cart has ${expectedCount} items`, async () => {
      const count = await this.locator.cartItems.count();

      expect(count).toBe(expectedCount);
    });
  }

  async assertCartItemsPresent(itemNames: string[]): Promise<void> {
    const itemsText = itemNames.join(', ');

    await test.step(`Assert cart contains items: ${itemsText}`, async () => {
      const cartItemNames = await this.locator.cartItemNames.allTextContents();

      for (const itemName of itemNames) {
        expect(cartItemNames).toContain(itemName);
      }
    });
  }
}
