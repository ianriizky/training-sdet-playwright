import test, { expect, type Page } from '@playwright/test';

import { CheckoutLocator } from '@/resources/locators/saucedemo/checkout.locator';
import { type CheckoutSelector } from '@/resources/selectors/saucedemo/checkout.selector';

import { AbstractPage } from './abstract.page';

export class CheckoutPage extends AbstractPage<CheckoutLocator> {
  constructor(
    protected override readonly page: Page,
    protected readonly selector: CheckoutSelector,
  ) {
    super(page, new CheckoutLocator(page, selector));
  }

  async performFillCheckoutForm(
    options?: Partial<{
      firstName: string;
      lastName: string;
      postalCode: string;
    }>,
  ): Promise<void> {
    await test.step('Fill checkout form', async () => {
      await this.locator.firstNameInput.fill(
        options?.firstName ?? this.faker.person.firstName(),
      );
      await this.locator.lastNameInput.fill(
        options?.lastName ?? this.faker.person.lastName(),
      );
      await this.locator.postalCodeInput.fill(
        options?.postalCode ?? this.faker.location.zipCode(),
      );
    });
  }

  async performClickContinue(): Promise<void> {
    await test.step('Click continue button', async () => {
      await this.locator.continueButton.click();
    });
  }

  async performClickCancel(): Promise<void> {
    await test.step('Click cancel button', async () => {
      await this.locator.cancelButton.click();
    });
  }

  async assertHasCheckoutPage(): Promise<void> {
    await expect(this.page).toHaveURL(
      new RegExp(`${this.config.baseURL}/checkout-step-one(\\.html)?$`),
    );
  }

  async assertHasCheckoutOverviewPage(): Promise<void> {
    await expect(this.page).toHaveURL(
      new RegExp(`${this.config.baseURL}/checkout-step-two(\\.html)?$`),
    );
  }

  async assertHasErrorMessage(errorText: string): Promise<void> {
    await expect(this.locator.errorMessage).toContainText(errorText);
  }
}
