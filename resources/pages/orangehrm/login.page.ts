import test, { expect } from '@playwright/test';

import { loginSelector } from '@/resources/selectors/orangehrm/login.selector';

import { AbstractPage } from './abstract.page';

export class LoginPage extends AbstractPage {
  get usernameField() {
    return this.page.locator(loginSelector.usernameField);
  }

  get passwordField() {
    return this.page.locator(loginSelector.passwordField);
  }

  get loginButton() {
    return this.page.locator(loginSelector.loginButton);
  }

  get errorMessage() {
    return this.page.locator(loginSelector.errorMessage);
  }

  get requiredErrorMessages() {
    return this.page.locator(loginSelector.requiredErrorMessages);
  }

  get userDropdown() {
    return this.page.locator(loginSelector.userDropdown);
  }

  get logoutMenuItem() {
    return this.page.locator(loginSelector.logoutMenuItem);
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(`${this.config.baseURL}/web/index.php/auth/login`);
  }

  async performFillInValidCredentials(): Promise<void> {
    await test.step('Fill in valid credentials', async () => {
      const credential = this.randomAcceptedCredential;

      await this.usernameField.fill(credential.username);
      await this.passwordField.fill(credential.password);
    });
  }

  async performFillInInvalidCredentials(): Promise<void> {
    await test.step('Fill in invalid credentials', async () => {
      const credential = this.faker.internet;

      await this.usernameField.fill(credential.username());
      await this.passwordField.fill(credential.password());
    });
  }

  async performClickLoginButton(): Promise<void> {
    await test.step('Click login button', async () => {
      await this.loginButton.click();
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
      await this.userDropdown.click();
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
    await expect(this.errorMessage).toContainText('Invalid credentials');
  }

  async assertHasErrorLoginRequiredFields(): Promise<void> {
    const errorMessages = await this.requiredErrorMessages.all();

    for (const errorMessage of errorMessages) {
      await expect(errorMessage).toContainText('Required');
    }
  }
}
