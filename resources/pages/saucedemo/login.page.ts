import test, { expect, type Page } from '@playwright/test';

import { LoginSelector } from '@/resources/selectors/saucedemo/login.selector';

import { AbstractPage } from './abstract.page';

export class LoginPage extends AbstractPage<LoginSelector> {
  constructor(protected override readonly page: Page) {
    super(page, new LoginSelector(page));
  }

  async performFillInValidCredentials(): Promise<void> {
    await test.step('Fill in valid credentials', async () => {
      const credential = this.acceptedCredentials[0]!;

      await this.selector.usernameField.fill(credential.username);
      await this.selector.passwordField.fill(credential.password);
    });
  }

  async performFillInInvalidCredentials(): Promise<void> {
    await test.step('Fill in invalid credentials', async () => {
      const credential = this.faker.internet;

      await this.selector.usernameField.fill(credential.username());
      await this.selector.passwordField.fill(credential.password());
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
      await this.selector.loginButton.click();
    });
  }

  async performClickLogoutButton(): Promise<void> {
    await test.step('Click logout button', async () => {
      await this.selector.burgerMenuButton.click();
      await this.selector.logoutLink.click();
    });
  }

  async assertHasInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(
      new RegExp(`${this.config.baseURL}/inventory(\\.html)?$`),
    );
  }

  async assertHasErrorLoginUsernamePasswordDontMatch(): Promise<void> {
    await expect(this.selector.error).toContainText(
      'Username and password do not match any user in this service',
    );
  }

  async assertHasErrorLoginUsernameRequired(): Promise<void> {
    await expect(this.selector.error).toContainText('Username is required');
  }
}
