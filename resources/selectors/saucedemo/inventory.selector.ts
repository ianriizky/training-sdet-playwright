import {
  AbstractSelector,
  type Selector,
} from '@/resources/selectors/abstract.selector';
import { sharedSelectors } from '@/resources/selectors/saucedemo/shared-selectors';

export class InventorySelector extends AbstractSelector {
  protected readonly selector = {
    sortContainer: { selector: '[data-test="product-sort-container"]' },
    itemName: { selector: '[data-test="inventory-item-name"]' },
    itemPrice: { selector: '[data-test="inventory-item-price"]' },
    addToCartButton: { selector: '[data-test^="add-to-cart"]' },
    ...sharedSelectors,
    emptyCartMessage: { selector: '.cart_contents_container' },
  } satisfies Selector;

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
