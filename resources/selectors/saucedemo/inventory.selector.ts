import type { Selector } from '@/resources/locators/abstract.locator';

import { sharedSelectors } from './shared-selectors';

export const inventorySelector = {
  sortContainer: { selector: '[data-test="product-sort-container"]' },
  itemName: { selector: '[data-test="inventory-item-name"]' },
  itemPrice: { selector: '[data-test="inventory-item-price"]' },
  addToCartButton: { selector: '[data-test^="add-to-cart"]' },
  ...sharedSelectors,
  emptyCartMessage: { selector: '.cart_contents_container' },
} satisfies Selector;

export type InventorySelector = typeof inventorySelector;
