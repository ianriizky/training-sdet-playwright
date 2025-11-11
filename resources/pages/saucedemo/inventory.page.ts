import test, { expect, type Page } from '@playwright/test';

import { InventoryLocator } from '@/resources/locators/saucedemo/inventory.locator';
import { type InventorySelector } from '@/resources/selectors/saucedemo/inventory.selector';

import { AbstractPage } from './abstract.page';

export class InventoryPage extends AbstractPage<InventoryLocator> {
  constructor(
    protected override readonly page: Page,
    protected readonly selector: InventorySelector,
  ) {
    super(page, new InventoryLocator(page, selector));
  }

  async performSortByNameAZ(): Promise<void> {
    await test.step('Click sort by name A-Z', async () => {
      await this.locator.sortContainer.selectOption('az');
    });
  }

  async performSortByNameZA(): Promise<void> {
    await test.step('Click sort by name Z-A', async () => {
      await this.locator.sortContainer.selectOption('za');
    });
  }

  async performSortByPriceLowHigh(): Promise<void> {
    await test.step('Click sort by price low-high', async () => {
      await this.locator.sortContainer.selectOption('lohi');
    });
  }

  async performSortByPriceHighLow(): Promise<void> {
    await test.step('Click sort by price high-low', async () => {
      await this.locator.sortContainer.selectOption('hilo');
    });
  }

  async performAddRandomItemsToCart(count: number): Promise<void> {
    await test.step(`Select random item (${count}) Add to Cart`, async () => {
      const addToCartButtons = await this.locator.collectAddToCartButtons();

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
    await test.step(`Add ${indices.length} items to cart`, async () => {
      for (const index of indices) {
        await this.locator.addToCartButtons.nth(index).click();
      }
    });
  }

  async performOpenCart(): Promise<void> {
    await test.step('Open Cart', async () => {
      await this.locator.cartLink.click();
    });
  }

  async performRemoveItemFromCart(index: number): Promise<void> {
    await test.step('Remove item from cart', async () => {
      await this.locator.removeButtons.nth(index).click();
    });
  }

  async performRemoveAllItemsFromCart(): Promise<void> {
    await test.step('Remove all items from cart', async () => {
      const removeButtons = await this.locator.collectRemoveButtons();

      for (const removeButton of removeButtons) {
        await removeButton.click();
      }
    });
  }

  async assertItemsSortedByNameAZ(): Promise<void> {
    const itemNames = await this.locator.itemNames.allTextContents();
    const sortedNames = [...itemNames].sort();

    expect(itemNames).toEqual(sortedNames);
  }

  async assertItemsSortedByNameZA(): Promise<void> {
    const itemNames = await this.locator.itemNames.allTextContents();
    const sortedNames = [...itemNames].sort().reverse();

    expect(itemNames).toEqual(sortedNames);
  }

  async assertItemsSortedByPriceLowHigh(): Promise<void> {
    const itemPrices = await this.locator.itemPrices.allTextContents();
    const prices = itemPrices.map((price) =>
      parseFloat(price.replace('$', '')),
    );
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  }

  async assertItemsSortedByPriceHighLow(): Promise<void> {
    const itemPrices = await this.locator.itemPrices.allTextContents();
    const prices = itemPrices.map((price) =>
      parseFloat(price.replace('$', '')),
    );
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  }

  async assertCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.locator.cartBadge).toContainText(
      expectedCount.toString(),
    );
  }

  async assertCartItemCount(expectedCount: number): Promise<void> {
    const count = await this.locator.cartItems.count();
    expect(count).toBe(expectedCount);
  }

  async assertCartEmpty(): Promise<void> {
    const count = await this.locator.cartItems.count();
    expect(count).toBe(0);

    await expect(this.locator.emptyCartMessage).toContainText(
      'Continue Shopping',
    );
  }
}
