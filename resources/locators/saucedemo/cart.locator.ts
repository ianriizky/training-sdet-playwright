import { type CartSelector } from '@/resources/selectors/saucedemo/cart.selector';

import { CartItemsAbstractLocator } from './cart-items.abstract-locator';

export class CartLocator extends CartItemsAbstractLocator<CartSelector> {
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

  async collectRemoveButtons() {
    return this.collectLocatorsFromBaseLocator(this.removeButtons);
  }
}
