import type { Selector } from '@/resources/selectors/abstract.selector';

export const sharedSelectors = {
  /** Cart Item Display - Used in Cart and CheckoutOverview pages */
  cartItem: { selector: '[data-test="inventory-item"]' },
  cartItemName: { selector: '[data-test="inventory-item-name"]' },
  cartItemPrice: { selector: '[data-test="inventory-item-price"]' },
  cartItemQuantity: { selector: '[data-test="item-quantity"]' },

  /** Cart Navigation - Used in Inventory and Cart pages */
  cartBadge: { selector: '[data-test="shopping-cart-badge"]' },
  cartLink: { selector: '[data-test="shopping-cart-link"]' },

  /** Common Buttons - Used in multiple pages */
  removeButton: { selector: '[data-test^="remove-"]' },
} satisfies Selector;
