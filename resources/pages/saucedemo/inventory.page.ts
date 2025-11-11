import test, { expect } from '@playwright/test';

import { inventorySelector } from '@/resources/selectors/saucedemo/inventory.selector';

import { AbstractPage } from './abstract.page';

export class InventoryPage extends AbstractPage {
  get sortContainer() {
    return this.page.locator(inventorySelector.sortContainer);
  }

  get itemNames() {
    return this.page.locator(inventorySelector.itemName);
  }

  get itemPrices() {
    return this.page.locator(inventorySelector.itemPrice);
  }

  get addToCartButtons() {
    return this.page.locator(inventorySelector.addToCartButton);
  }

  get cartBadge() {
    return this.page.locator(inventorySelector.cartBadge);
  }

  get cartLink() {
    return this.page.locator(inventorySelector.cartLink);
  }

  get removeButtons() {
    return this.page.locator(inventorySelector.removeButton);
  }

  get cartItems() {
    return this.page.locator(inventorySelector.cartItem);
  }

  get emptyCartMessage() {
    return this.page.locator(inventorySelector.emptyCartMessage);
  }

  async performSortByNameAZ(): Promise<void> {
    await test.step('Click sort by name A-Z', async () => {
      await this.sortContainer.selectOption('az');
    });
  }

  async performSortByNameZA(): Promise<void> {
    await test.step('Click sort by name Z-A', async () => {
      await this.sortContainer.selectOption('za');
    });
  }

  async performSortByPriceLowHigh(): Promise<void> {
    await test.step('Click sort by price low-high', async () => {
      await this.sortContainer.selectOption('lohi');
    });
  }

  async performSortByPriceHighLow(): Promise<void> {
    await test.step('Click sort by price high-low', async () => {
      await this.sortContainer.selectOption('hilo');
    });
  }

  async performAddRandomItemsToCart(count: number): Promise<void> {
    await test.step(`Select random item (${count}) Add to Cart`, async () => {
      const totalButtons = await this.addToCartButtons.count();

      const selectedIndices = new Set<number>();
      while (selectedIndices.size < Math.min(count, totalButtons)) {
        selectedIndices.add(
          this.faker.number.int({ min: 0, max: totalButtons - 1 }),
        );
      }

      for (const index of selectedIndices) {
        await this.addToCartButtons.nth(index).click();
      }
    });
  }

  async performAddSpecificItemsToCart(indices: number[]): Promise<void> {
    await test.step(`Add ${indices.length} items to cart`, async () => {
      for (const index of indices) {
        await this.addToCartButtons.nth(index).click();
      }
    });
  }

  async performOpenCart(): Promise<void> {
    await test.step('Open Cart', async () => {
      await this.cartLink.click();
    });
  }

  async performRemoveItemFromCart(index: number): Promise<void> {
    await test.step('Remove item from cart', async () => {
      await this.removeButtons.nth(index).click();
    });
  }

  async performRemoveAllItemsFromCart(): Promise<void> {
    await test.step('Remove all items from cart', async () => {
      const removeCount = await this.removeButtons.count();

      for (let i = 0; i < removeCount; i++) {
        await this.page.locator(inventorySelector.removeButton).first().click();
      }
    });
  }

  async assertItemsSortedByNameAZ(): Promise<void> {
    const itemNames = await this.itemNames.allTextContents();
    const sortedNames = [...itemNames].sort();

    expect(itemNames).toEqual(sortedNames);
  }

  async assertItemsSortedByNameZA(): Promise<void> {
    const itemNames = await this.itemNames.allTextContents();
    const sortedNames = [...itemNames].sort().reverse();

    expect(itemNames).toEqual(sortedNames);
  }

  async assertItemsSortedByPriceLowHigh(): Promise<void> {
    const itemPrices = await this.itemPrices.allTextContents();
    const prices = itemPrices.map((price) =>
      parseFloat(price.replace('$', '')),
    );
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  }

  async assertItemsSortedByPriceHighLow(): Promise<void> {
    const itemPrices = await this.itemPrices.allTextContents();
    const prices = itemPrices.map((price) =>
      parseFloat(price.replace('$', '')),
    );
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  }

  async assertCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toContainText(expectedCount.toString());
  }

  async assertCartItemCount(expectedCount: number): Promise<void> {
    const count = await this.cartItems.count();
    expect(count).toBe(expectedCount);
  }

  async assertCartEmpty(): Promise<void> {
    const count = await this.cartItems.count();
    expect(count).toBe(0);

    await expect(this.emptyCartMessage).toContainText('Continue Shopping');
  }
}
