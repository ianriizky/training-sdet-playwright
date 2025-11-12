import { type CartSelector } from '@/resources/selectors/saucedemo/cart.selector';

import { AbstractLocator } from '../abstract.locator';

import type { Locator } from '@playwright/test';

export class CartLocator extends AbstractLocator<CartSelector> {
  get cartItems() {
    return this.page.locator(this.selector.cartItem.selector);
  }

  get cartItemNames() {
    return this.page.locator(this.selector.cartItemName.selector);
  }

  get cartItemPrices() {
    return this.page.locator(this.selector.cartItemPrice.selector);
  }

  get cartItemQuantities() {
    return this.page.locator(this.selector.cartItemQuantity.selector);
  }

  get removeButtons() {
    return this.page.locator(this.selector.removeButton.selector);
  }

  get continueShoppingButton() {
    return this.page.locator(this.selector.continueShoppingButton.selector);
  }

  get checkoutButton() {
    return this.page.locator(this.selector.checkoutButton.selector);
  }

  get cartBadge() {
    return this.page.locator(this.selector.cartBadge.selector);
  }

  getLocatorByDataTest(dataTest: string) {
    return this.page.locator(`[data-test="${dataTest}"]`);
  }

  async collectRemoveButtons() {
    const removeButtons = await this.removeButtons.all();
    const removeButtonLocators: Locator[] = [];

    for (const button of removeButtons) {
      const name = await button.getAttribute('data-test');

      if (name) {
        removeButtonLocators.push(this.getLocatorByDataTest(name));
      }
    }

    return removeButtonLocators;
  }
}
