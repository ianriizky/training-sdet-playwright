import test, { expect } from '@playwright/test';

import type { CartItemsAbstractSelector } from '@/resources/selectors/saucedemo/cart-items.abstract-selector';

import { AbstractPage } from './abstract.page';

export abstract class CartItemsAbstractPage<
  TSelector extends CartItemsAbstractSelector,
> extends AbstractPage<TSelector> {
  async assertCartItemCount(expectedCount: number): Promise<void> {
    await test.step(`Assert cart has ${expectedCount} items`, async () => {
      const count = await this.selector.cartItems.count();

      expect(count).toBe(expectedCount);
    });
  }

  async assertCartItemsPresent(itemNames: string[]): Promise<void> {
    const itemsText = itemNames.join(', ');

    await test.step(`Assert cart contains items: ${itemsText}`, async () => {
      const cartItemNames = await this.selector.cartItemNames.allTextContents();

      for (const itemName of itemNames) {
        expect(cartItemNames).toContain(itemName);
      }
    });
  }
}
