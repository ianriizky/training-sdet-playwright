import test, { expect, type Page } from '@playwright/test';

import { CheckoutSelector } from '@/resources/selectors/saucedemo/checkout.selector';

import { AbstractPage } from './abstract.page';

export class CheckoutPage extends AbstractPage<CheckoutSelector> {
  constructor(protected override readonly page: Page) {
    super(page, new CheckoutSelector(page));
  }

  async performFillCheckoutForm(
    options?: Partial<{
      firstName: string;
      lastName: string;
      postalCode: string;
    }>,
  ): Promise<void> {
    await test.step('Fill checkout form', async () => {
      await this.selector.firstNameInput.fill(
        options?.firstName ?? this.faker.person.firstName(),
      );
      await this.selector.lastNameInput.fill(
        options?.lastName ?? this.faker.person.lastName(),
      );
      await this.selector.postalCodeInput.fill(
        options?.postalCode ?? this.faker.location.zipCode(),
      );
    });
  }

  async performClickContinue(): Promise<void> {
    await test.step('Click continue button', async () => {
      await this.selector.continueButton.click();
    });
  }

  async performClickCancel(): Promise<void> {
    await test.step('Click cancel button', async () => {
      await this.selector.cancelButton.click();
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
    await expect(this.selector.errorMessage).toContainText(errorText);
  }
}
