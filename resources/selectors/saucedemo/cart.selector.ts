import { sharedSelectors } from '@/resources/selectors/saucedemo/shared-selectors';

import { type Selector } from '../abstract.selector';

import { CartItemsAbstractSelector } from './cart-items.abstract-selector';

export class CartSelector extends CartItemsAbstractSelector {
  protected readonly selector = {
    ...sharedSelectors,
    continueShoppingButton: { selector: '[data-test="continue-shopping"]' },
    checkoutButton: { selector: '[data-test="checkout"]' },
  } satisfies Selector;

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
