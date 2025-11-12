import type { Selector } from '@/resources/locators/abstract.locator';

export const cartSelector = {
  cartItem: { selector: '[data-test="inventory-item"]' },
  cartItemName: { selector: '[data-test="inventory-item-name"]' },
  cartItemPrice: { selector: '[data-test="inventory-item-price"]' },
  cartItemQuantity: { selector: '[data-test="item-quantity"]' },
  removeButton: { selector: '[data-test^="remove-"]' },
  continueShoppingButton: { selector: '[data-test="continue-shopping"]' },
  checkoutButton: { selector: '[data-test="checkout"]' },
  cartBadge: { selector: '[data-test="shopping-cart-badge"]' },
} satisfies Selector;

export type CartSelector = typeof cartSelector;
