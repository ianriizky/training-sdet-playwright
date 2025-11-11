import test, { expect, type Page } from '@playwright/test';

import { LoginLocator } from '@/resources/locators/saucedemo/login.locator';
import { type LoginSelector } from '@/resources/selectors/saucedemo/login.selector';

import { AbstractPage } from './abstract.page';

export class LoginPage extends AbstractPage<LoginLocator> {
  constructor(
    protected override readonly page: Page,
    protected readonly selector: LoginSelector,
  ) {
    super(page, new LoginLocator(page, selector));
  }

  async performFillInValidCredentials(): Promise<void> {
    await test.step('Fill in valid credentials', async () => {
      const credential = this.acceptedCredentials[0]!;

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

  async performValidLogin(): Promise<void> {
    await this.performFillInValidCredentials();
    await this.performClickLoginButton();
  }

  async performInvalidLogin(): Promise<void> {
    await this.performFillInInvalidCredentials();
    await this.performClickLoginButton();
  }

  async performClickLoginButton(): Promise<void> {
    await test.step('Click login button', async () => {
      await this.locator.loginButton.click();
    });
  }

  async performClickLogoutButton(): Promise<void> {
    await test.step('Click logout button', async () => {
      await this.locator.burgerMenuButton.click();
      await this.locator.logoutLink.click();
    });
  }

  async assertHasInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(
      new RegExp(`${this.config.baseURL}/inventory(\\.html)?$`),
    );
  }

  async assertHasErrorLoginUsernamePasswordDontMatch(): Promise<void> {
    await expect(this.locator.error).toContainText(
      'Username and password do not match any user in this service',
    );
  }

  async assertHasErrorLoginUsernameRequired(): Promise<void> {
    await expect(this.locator.error).toContainText('Username is required');
  }
}
