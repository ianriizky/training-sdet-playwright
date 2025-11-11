import type { Selector } from '@/resources/locators/abstract.locator';

export const inventorySelector = {
  sortContainer: { selector: '[data-test="product-sort-container"]' },
  itemName: { selector: '[data-test="inventory-item-name"]' },
  itemPrice: { selector: '[data-test="inventory-item-price"]' },
  addToCartButton: { selector: '[data-test^="add-to-cart"]' },
  cartBadge: { selector: '[data-test="shopping-cart-badge"]' },
  cartLink: { selector: '[data-test="shopping-cart-link"]' },
  removeButton: { selector: '[data-test^="remove-"]' },
  cartItem: { selector: '[data-test="inventory-item"]' },
  emptyCartMessage: { selector: '.cart_contents_container' },
} satisfies Selector;

export type InventorySelector = typeof inventorySelector;
