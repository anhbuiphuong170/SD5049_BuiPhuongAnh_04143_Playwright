import { clickAndAcceptAlert } from '../helpers/click-and-accept-alert.js';

export class ProfilePage {
  constructor(page) {
    this.page = page;
  }

  async findBook(title) {
    await this.page.goto('https://demoqa.com/profile');
    await this.page.getByPlaceholder('Type to search', { exact: true }).fill(title);
  }

  bookTitle(title) {
    return this.page.getByRole('link', { name: title, exact: true });
  }

  async deleteBook(title) {
    const bookRow = this.page.getByRole('row').filter({
      has: this.bookTitle(title),
    });

    const deleteIcon = bookRow.locator('[id^="delete-record"], [title="Delete"]').first();
    await deleteIcon.click();

    const confirmButton = this.page.getByRole('button', {
      name: 'OK',
      exact: true,
    });

    return clickAndAcceptAlert(this.page, confirmButton);
  }
}