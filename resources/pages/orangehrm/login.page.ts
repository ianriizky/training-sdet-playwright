import test, { expect, type Page } from '@playwright/test';

import { LoginLocator } from '@/resources/locators/orangehrm/login.locator';
import type { LoginSelector } from '@/resources/selectors/orangehrm/login.selector';

import { AbstractPage } from './abstract.page';

export class LoginPage extends AbstractPage<LoginLocator> {
  constructor(
    protected override readonly page: Page,
    protected readonly selector: LoginSelector,
  ) {
    super(page, new LoginLocator(page, selector));
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(`${this.config.baseURL}/web/index.php/auth/login`);
  }

  async performFillInValidCredentials(): Promise<void> {
    await test.step('Fill in valid credentials', async () => {
      const credential = this.randomAcceptedCredential;

      await this.locator.usernameField.fill(credential.username);
      await this.locator.passwordField.fill(credential.password);
    });
  }

  async performFillInInvalidCredentials(): Promise<void> {
    await test.step('Fill in invalid credentials', async () => {
      const credential = this.faker.internet;

      await this.locator.usernameField.fill(credential.username());
      await this.locator.passwordField.fill(credential.password());
    });
  }

  async performClickLoginButton(): Promise<void> {
    await test.step('Click login button', async () => {
      await this.locator.loginButton.click();
    });
  }

  async performValidLogin(): Promise<void> {
    await this.performFillInValidCredentials();
    await this.performClickLoginButton();
  }

  async performInvalidLogin(): Promise<void> {
    await this.performFillInInvalidCredentials();
    await this.performClickLoginButton();
  }

  async performClickLogoutButton(): Promise<void> {
    await test.step('Click logout button', async () => {
      await this.locator.userDropdown.click();
      await this.page.getByRole('menuitem', { name: 'Logout' }).click();
    });
  }

  async assertHasDashboardPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*dashboard/);
  }

  async assertHasLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*auth\/login/);
  }

  async assertHasErrorLoginInvalidCredentials(): Promise<void> {
    await expect(this.locator.errorMessage).toContainText(
      'Invalid credentials',
    );
  }

  async assertHasErrorLoginRequiredFields(): Promise<void> {
    const errorMessages = await this.locator.requiredErrorMessages.all();

    for (const errorMessage of errorMessages) {
      await expect(errorMessage).toContainText('Required');
    }
  }
}
