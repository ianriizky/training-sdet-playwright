import { AbstractSelector } from '../abstract.selector';

import type { Locator } from '@playwright/test';

export abstract class CartItemsAbstractSelector extends AbstractSelector {
  abstract get cartItems(): Locator;

  abstract get cartItemNames(): Locator;
}
