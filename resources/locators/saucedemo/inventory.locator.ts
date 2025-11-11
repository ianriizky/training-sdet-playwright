import { type InventorySelector } from '@/resources/selectors/saucedemo/inventory.selector';

import { AbstractLocator } from '../abstract.locator';

import type { Locator } from '@playwright/test';

export class InventoryLocator extends AbstractLocator<InventorySelector> {
  get sortContainer() {
    return this.page.locator(this.selector.sortContainer.selector);
  }

  get itemNames() {
    return this.page.locator(this.selector.itemName.selector);
  }

  get itemPrices() {
    return this.page.locator(this.selector.itemPrice.selector);
  }

  get addToCartButtons() {
    return this.page.locator(this.selector.addToCartButton.selector);
  }

  get cartBadge() {
    return this.page.locator(this.selector.cartBadge.selector);
  }

  get cartLink() {
    return this.page.locator(this.selector.cartLink.selector);
  }

  get removeButtons() {
    return this.page.locator(this.selector.removeButton.selector);
  }

  get cartItems() {
    return this.page.locator(this.selector.cartItem.selector);
  }

  get emptyCartMessage() {
    return this.page.locator(this.selector.emptyCartMessage.selector);
  }

  getLocatorByDataTest(dataTest: string) {
    return this.page.locator(`[data-test="${dataTest}"]`);
  }

  async collectAddToCartButtons() {
    const addToButtons = await this.addToCartButtons.all();
    const addToCartButtonLocators: Locator[] = [];

    for (const button of addToButtons) {
      const name = await button.getAttribute('data-test');

      if (name) {
        addToCartButtonLocators.push(this.getLocatorByDataTest(name));
      }
    }

    return addToCartButtonLocators;
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
