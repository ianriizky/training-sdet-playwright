import { AbstractLocator, type SelectorOptions } from '../abstract.locator';

import type { Locator } from '@playwright/test';

export type CartItemsSelector = {
  cartItem: SelectorOptions;
  cartItemName: SelectorOptions;
};

export abstract class CartItemsAbstractLocator<
  TSelector extends CartItemsSelector = CartItemsSelector,
> extends AbstractLocator<TSelector> {
  abstract get cartItems(): Locator;

  abstract get cartItemNames(): Locator;
}
