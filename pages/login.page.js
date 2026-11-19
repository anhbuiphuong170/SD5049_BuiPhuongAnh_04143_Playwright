export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async signIn() {
    const {
      DEMOQA_USERNAME: username,
      DEMOQA_PASSWORD: password,
    } = process.env;

    if (!username || !password) {
      throw new Error('Set DEMOQA_USERNAME and DEMOQA_PASSWORD before running collection tests.');
    }

    await this.page.goto('https://demoqa.com/login');
    await this.page.locator('#userName').fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.getByRole('button', { name: 'Login', exact: true }).click();
    await this.page.waitForURL(/\/profile\/?$/);
  }
}