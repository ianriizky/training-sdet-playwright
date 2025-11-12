import { type InventorySelector } from '@/resources/selectors/saucedemo/inventory.selector';

import { AbstractLocator } from '../abstract.locator';

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

  async collectAddToCartButtons() {
    return this.collectLocatorsFromBaseLocator(this.addToCartButtons);
  }

  async collectRemoveButtons() {
    return this.collectLocatorsFromBaseLocator(this.removeButtons);
  }
}
