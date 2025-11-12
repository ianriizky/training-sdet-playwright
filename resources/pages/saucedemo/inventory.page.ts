import test, { expect, type Page } from '@playwright/test';

import { InventorySelector } from '@/resources/selectors/saucedemo/inventory.selector';

import { AbstractPage } from './abstract.page';

export class InventoryPage extends AbstractPage<InventorySelector> {
  constructor(protected override readonly page: Page) {
    super(page, new InventorySelector(page));
  }

  async performSortByNameAZ(): Promise<void> {
    await test.step('Click sort by name A-Z', async () => {
      await this.selector.sortContainer.selectOption('az');
    });
  }

  async performSortByNameZA(): Promise<void> {
    await test.step('Click sort by name Z-A', async () => {
      await this.selector.sortContainer.selectOption('za');
    });
  }

  async performSortByPriceLowHigh(): Promise<void> {
    await test.step('Click sort by price low-high', async () => {
      await this.selector.sortContainer.selectOption('lohi');
    });
  }

  async performSortByPriceHighLow(): Promise<void> {
    await test.step('Click sort by price high-low', async () => {
      await this.selector.sortContainer.selectOption('hilo');
    });
  }

  async performAddRandomItemsToCart(count: number): Promise<void> {
    await test.step(`Select random item (${count}) Add to Cart`, async () => {
      const addToCartButtons = await this.selector.collectAddToCartButtons();

      const selectedIndices = new Set<number>();
      while (selectedIndices.size < Math.min(count, addToCartButtons.length)) {
        const selectedIndex = this.faker.number.int({
          min: 0,
          max: addToCartButtons.length - 1,
        });

        if (!selectedIndices.has(selectedIndex)) {
          selectedIndices.add(selectedIndex);
        }
      }

      for (const index of selectedIndices) {
        await addToCartButtons[index]!.click();
      }
    });
  }

  async performAddSpecificItemsToCart(indices: number[]): Promise<void> {
    const addToCartButtons = await this.selector.collectAddToCartButtons();

    test.skip(
      indices.length > addToCartButtons.length,
      `Not enough items to add to cart. Expected ${indices.length}, but only ${addToCartButtons.length} available.`,
    );

    await test.step(`Add ${indices.length} items to cart`, async () => {
      for (const index of indices) {
        await addToCartButtons[index]!.click();
      }
    });
  }

  async performOpenCart(): Promise<void> {
    await test.step('Open Cart', async () => {
      await this.selector.cartLink.click();
    });
  }

  async performRemoveItemFromCart(index: number): Promise<void> {
    const removeButtons = await this.selector.collectRemoveButtons();

    test.skip(
      index > removeButtons.length - 1,
      `Not enough items to remove from cart. Expected ${index}, but only ${removeButtons.length} available.`,
    );

    await test.step('Remove item from cart', async () => {
      await removeButtons[index]!.click();
    });
  }

  async performRemoveAllItemsFromCart(): Promise<void> {
    await test.step('Remove all items from cart', async () => {
      const removeButtons = await this.selector.collectRemoveButtons();

      for (const removeButton of removeButtons) {
        await removeButton.click();
      }
    });
  }

  async assertItemsSortedByNameAZ(): Promise<void> {
    const itemNames = await this.selector.itemNames.allTextContents();
    const sortedNames = [...itemNames].sort();

    expect(itemNames).toEqual(sortedNames);
  }

  async assertItemsSortedByNameZA(): Promise<void> {
    const itemNames = await this.selector.itemNames.allTextContents();
    const sortedNames = [...itemNames].sort().reverse();

    expect(itemNames).toEqual(sortedNames);
  }

  async assertItemsSortedByPriceLowHigh(): Promise<void> {
    const itemPrices = await this.selector.itemPrices.allTextContents();
    const prices = itemPrices.map((price) =>
      parseFloat(price.replace('$', '')),
    );
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  }

  async assertItemsSortedByPriceHighLow(): Promise<void> {
    const itemPrices = await this.selector.itemPrices.allTextContents();
    const prices = itemPrices.map((price) =>
      parseFloat(price.replace('$', '')),
    );
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  }

  async assertCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.selector.cartBadge).toContainText(
      expectedCount.toString(),
    );
  }

  async assertCartItemCount(expectedCount: number): Promise<void> {
    const count = await this.selector.cartItems.count();
    expect(count).toBe(expectedCount);
  }

  async assertCartEmpty(): Promise<void> {
    const count = await this.selector.cartItems.count();
    expect(count).toBe(0);

    await expect(this.selector.emptyCartMessage).toContainText(
      'Continue Shopping',
    );
  }
}
